import { inject, injectable } from 'tsyringe';
import IAddressRepository from '../repositories/IAddressRepository';
import ICustomersRepository from '../repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import { add } from 'date-fns';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
  addressId: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ addressId }: IRequest) {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError('Endereço não encontrado');
    }

    console.log(address);

    if (address.addressDefault) {
      throw new AppError(
        'Não é possivel excluir um endereço padrão, cadastre outro endereço como padrão para conseguir excluir este endereço !',
      );
    }

    await this.addressRepository.delete(address);

    return;
  }
}

export default UpdateAddressService;
