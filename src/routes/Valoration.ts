import express from 'express';
import controller from '../controllers/Valoration';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.event.create), controller.createValoration);
router.get('/:eventId', controller.readValoration);
router.get('/', controller.readAll);
router.put('/:eventId', ValidateSchema(Schemas.event.update), controller.updateValoration);
router.delete('/:eventId', controller.deleteValoration);

export = router;