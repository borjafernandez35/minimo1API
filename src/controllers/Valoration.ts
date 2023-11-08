import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event';
import Valoration from '../models/Valoration';


const createValoration = (req: Request, res: Response, next: NextFunction) => {
    const { eventName, date, idUser, description, avatar, idComments } = req.body;

    const valoration = new Valoration({
        _id: new mongoose.Types.ObjectId(),
        eventName,
        date,
        idUser,
        description,
        avatar,
        idComments
    });

    return valoration
        .save()
        .then((valoration) => res.status(201).json(valoration))
        .catch((error) => res.status(500).json({ error }));
};

const readValoration = (req: Request, res: Response, next: NextFunction) => {
    const valorationId = req.params.valorationId;

    return Valoration.findById(valorationId)
        .populate('eventName') //, 'idComments', 'idChat'
        .then((valoration) => (valoration ? res.status(200).json(valoration) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Event.find()
        .populate('idUser')
        .populate('eventName') //, 'idComments', 'idChat'
        .then((valorations) => {
            res.status(200).json(valorations);
        })
        .catch((error) => res.status(500).json({ error }));
};

const updateValoration = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url;
    console.log(url);
    const urlSplitted: string[] = url.split('/');
    const id = urlSplitted[1];
    console.log(id);

    return Valoration.findByIdAndUpdate(id)
        .then((valoration) => {
            if (valoration) {
                valoration.set(req.body);

                return valoration
                    .save()
                    .then((savedValoration) => res.status(201).json(savedValoration))
                    .catch((saveError) => {
                        if (saveError.name === 'ValidationError') {
                            // Handle validation errors
                            return res.status(400).json({ message: saveError.message });
                        } else {
                            // Handle other save errors
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }
                    });
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((findByIdAndUpdateError) => {
            // Handle errors that occur during findByIdAndUpdate
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};

const deleteValoration = (req: Request, res: Response, next: NextFunction) => {
    const valorationId = req.params.valorationId;

    return Valoration.findByIdAndDelete(valorationId)
        .then((valoration) => (valoration ? res.status(201).json({ valoration, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createValoration, readValoration, readAll, updateValoration, deleteValoration };
