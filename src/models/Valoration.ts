import mongoose, { Document, Schema } from 'mongoose';
import { IEvent } from './Event';
import { ICategory } from './Category';
import { IComment } from './Comment';
import { IUser } from './User';

export interface IValoration {
    eventName: IEvent;
    date: Date;
    idUser: IUser;
    description: string;
    avatar: string;
    idComments: IComment;
}

export interface IValorationModel extends IEvent, Document,IComment, IUser {}

const EventSchema: Schema = new Schema(
    {
         date: { type: Date, required: true },
        eventName: { type: Schema.Types.ObjectId, required: false, ref: 'Event'},
        idUser: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
        description: { type: String, required: true },
        avatar: { type: String, required: false },
        idComments: [{ type: Schema.Types.ObjectId, required: false, ref: 'Comment' }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IValorationModel>('Valoration', EventSchema);