import { inject, injectable } from 'tsyringe';
import IAddressRepository from '../repositories/IAddressRepository';
import ICustomersRepository from '../repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import { add } from 'date-fns';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
  addressId: string;
  defaultAddress: boolean;
  name: string;
  street: string;
  district: string;
  uf: string;
  city: string;
  cep: string;
  number: string;
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

  public async execute({
    name,
    street,
    district,
    cep,
    city,
    number,
    defaultAddress,
    uf,
    addressId,
    customerId,
  }: IRequest) {
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

    const addressDefault = customer.adresses.filter(address => {
      return address.addressDefault === true;
    });

    if (adressesOfThisCustomer.length <= 0) {
      throw new AppError('O endereço informado não pertence ao seu usuário :(');
    }

    console.log(defaultAddress);

    if (defaultAddress !== undefined) {
      console.log('entrou aki');
      if (addressDefault.length <= 0) {
        if (!defaultAddress) {
          throw new AppError('Você precisa ter pelo menos um endereço padrão');
        }
        address.addressDefault = defaultAddress;
      } else {
        if (addressDefault[0].id === address.id) {
          if (!!!defaultAddress) {
            throw new AppError(
              'Você precisa ter pelo menos um endereço padrão',
            );
          }
          address.addressDefault = defaultAddress;
        } else {
          address.addressDefault = defaultAddress;
          addressDefault[0].addressDefault = !defaultAddress;
        }
      }
    }
    address.addressDefault = defaultAddress;
    address.cep = cep;
    address.city = city;
    address.district = district;
    address.number = number;
    address.uf = uf;
    address.street = street;
    address.name = name;

    console.log(address);

    await this.addressRepository.save(address);
    await this.addressRepository.save(addressDefault[0]);
    return address;
  }
}

export default UpdateAddressService;
