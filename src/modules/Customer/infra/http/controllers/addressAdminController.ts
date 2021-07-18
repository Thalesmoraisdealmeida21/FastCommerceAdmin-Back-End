import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateAddressService from '../../../services/CreateAddressService';

import UpdateAddressService from '../../../services/UpdateAddressAdminService';

import DeleteAddressAdminService from '../../../services/DeleteAddressAdminService';

export default class AddressAdminController {
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

    const { idCustomer } = request.params;

    const customer = await createAddress.execute({
      cep,
      city,
      customerId: String(idCustomer),
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
    const { addressId } = request.params;
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

    console.log(addressId);

    const customer = await updateAddress.execute({
      cep,
      city,
      defaultAddress,
      district,
      name,
      number,
      street,
      uf,

      addressId: String(addressId),
    });

    return response.status(201).json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteAddress = container.resolve(DeleteAddressAdminService);
    const { addressId } = request.params;

    console.log(addressId);

    await deleteAddress.execute({
      addressId: String(addressId),
    });

    return response.status(200).json({});
  }
}
