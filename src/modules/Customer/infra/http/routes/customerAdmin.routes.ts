import { Router } from 'express';

import CustomerController from '../controllers/customerController';

import AddressAdminController from '../controllers/addressAdminController';

const customerController = new CustomerController();
const customerRouter = Router();

const addressAdminController = new AddressAdminController();
customerRouter.get('/', customerController.listAll);
customerRouter.get('/:idCustomer', customerController.listOne);

customerRouter.put('/:idCustomer', customerController.updateOne);

customerRouter.post('/address/:idCustomer', addressAdminController.create);

customerRouter.put('/address/:addressId', addressAdminController.update);
customerRouter.delete('/address/:addressId', addressAdminController.delete);

export default customerRouter;
