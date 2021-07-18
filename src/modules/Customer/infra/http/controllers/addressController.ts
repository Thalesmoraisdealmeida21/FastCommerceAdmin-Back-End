import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateAddressService from '../../../services/CreateAddressService';

import UpdateAddressService from '../../../services/UpdateAddressService';

import DeleteAddressService from '../../../services/DeleteAddressService';

export default class AddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAddress = container.resolve(CreateAddressService);
    const {
      cep,
      city,
      street,
      uf,
      district,
      name,
      defaultAddress,
      number,
    } = request.body;

    const { id } = request.customer;

    const customer = await createAddress.execute({
      cep,
      city,
      customerId: String(id),
      defaultAddress,
      district,
      name,
      number,
      street,
      uf,
    });

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateAddress = container.resolve(UpdateAddressService);
    const customerId = request.customer.id;
    const {
      cep,
      city,
      street,
      uf,
      district,
      name,
      defaultAddress,
      number,
      addressId,
    } = request.body;

    const customer = await updateAddress.execute({
      cep,
      city,
      defaultAddress,
      district,
      name,
      number,
      street,
      uf,
      customerId: String(customerId),
      addressId: String(addressId),
    });

    return response.status(201).json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteAddress = container.resolve(DeleteAddressService);
    const { addressId } = request.params;
    const customerId = request.customer.id;

    await deleteAddress.execute({
      addressId: String(addressId),
      customerId,
    });

    return response.status(200).json({});
  }
}
