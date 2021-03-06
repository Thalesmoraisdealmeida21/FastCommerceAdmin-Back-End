import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

import ListCustomerService from '../../../services/ListDataClientService';

import ListAllCustomers from '../../../services/ListAllCustomers';

import ListOneCustomerService from '../../../services/ListOneCustomerService';

import UpdateOneCustomerService from '../../../services/UpdateOneCustomerService';

import { verify } from 'jsonwebtoken';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomerService);
    const { name, email, password, cpf, birthdate } = request.body;

    const customer = await createCustomer.execute({
      email,
      name,
      password,
      birthdate,
      cpf,
    });

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCustomer = container.resolve(UpdateCustomerService);

    const id = request.customer.id;
    // console.log(request.customer);
    const { name, email, cpf, birthdate } = request.body;

    const customer = await updateCustomer.execute({
      id: String(id),
      email,
      name,
      birthdate,
      cpf,
    });

    return response.status(201).json(customer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomer = container.resolve(ListCustomerService);

    const customer = await listCustomer.execute({
      id: request.customer.id,
    });

    return response.status(201).json(customer);
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllCustomers = container.resolve(ListAllCustomers);

    const { page } = request.query;

    const customers = await listAllCustomers.execute(Number(page));

    return response.status(201).json(customers);
  }

  public async listOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listOneCustomers = container.resolve(ListOneCustomerService);

    const { idCustomer } = request.params;

    const customer = await listOneCustomers.execute(idCustomer);

    return response.status(200).json(customer);
  }

  public async updateOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateOne = container.resolve(UpdateOneCustomerService);

    const { idCustomer } = request.params;

    const { email, cpf, name, birthdate } = request.body;

    const customer = await updateOne.execute({
      birthdate,
      cpf,
      email,
      name,
      id: idCustomer,
    });

    return response.status(200).json(customer);
  }
}
