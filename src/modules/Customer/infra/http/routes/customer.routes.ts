import { Router } from 'express';

import customerEnsureAuthenticate from './../middlewares/CustomerEnsureAuthenticated';

import CustomerController from '../controllers/customerController';
import AuthCustomerController from '../controllers/authCustomerController';
import AddressController from '../controllers/addressController';

const customerController = new CustomerController();
const authCustomerController = new AuthCustomerController();
const addressController = new AddressController();

const customerRouter = Router();

customerRouter.post('/', customerController.create);
customerRouter.put('/', customerEnsureAuthenticate, customerController.update);
customerRouter.post(
  '/address',
  customerEnsureAuthenticate,
  addressController.create,
);

customerRouter.put(
  '/address',
  customerEnsureAuthenticate,
  addressController.update,
);

customerRouter.post('/auth', authCustomerController.login);
customerRouter.get('/', customerEnsureAuthenticate, customerController.index);
customerRouter.post(
  '/sendlink_resetpassword',
  authCustomerController.generateResetLinkPassword,
);

customerRouter.post('/reset_password', authCustomerController.resetPassword);

export default customerRouter;
