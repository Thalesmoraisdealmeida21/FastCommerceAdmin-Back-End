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
  }: IRequest) {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError('Endereço não encontrado');
    }
    const customer =
      (await this.customersRepository.findById(address.customerId)) ||
      ({} as Customer);

    const addressDefault = customer.adresses.filter(address => {
      return address.addressDefault === true;
    });

    if (defaultAddress !== undefined) {
      if (addressDefault.length <= 0) {
        if (!defaultAddress) {
          throw new AppError('Você precisa ter pelo menos um endereço padrão');
        }
        address.addressDefault = defaultAddress;
      } else {
        if (addressDefault[0].id === address.id) {
          if (!!!defaultAddress) {
            console.log('entrou aki');
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
