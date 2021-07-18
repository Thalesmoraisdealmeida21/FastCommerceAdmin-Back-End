import { inject, injectable } from 'tsyringe';
import IAddressRepository from '../repositories/IAddressRepository';
import ICustomersRepository from '../repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import { add } from 'date-fns';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
  addressId: string;

  customerId: string;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ addressId, customerId }: IRequest) {
    const address = await this.addressRepository.findById(addressId);
    const customer = await this.customersRepository.findById(customerId);

    if (!address) {
      throw new AppError('Endereço não encontrado');
    }
    if (!customer) {
      throw new AppError('Este usuário não existe :(');
    }

    const adressesOfThisCustomer = customer.adresses.filter(address => {
      return address.id === addressId;
    });

    if (adressesOfThisCustomer.length <= 0) {
      throw new AppError('O endereço informado não pertence ao seu usuário :(');
    }

    if (address.addressDefault) {
      throw new AppError(
        'Não é possivel excluir um endereço padrão, cadastre outro endereço como padrão para conseguir excluir este endereço !',
      );
    }

    await this.addressRepository.delete(address);

    return address;
  }
}

export default UpdateAddressService;
