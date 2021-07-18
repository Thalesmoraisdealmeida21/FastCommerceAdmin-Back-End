import { inject, injectable } from 'tsyringe';
import IAddressRepository from '../repositories/IAddressRepository';
import ICustomersRepository from '../repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  street: string;
  district: string;
  uf: string;
  city: string;
  cep: string;
  defaultAddress: boolean;
  customerId: string;
  number: string;
}

@injectable()
class CreateAddressService {
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
    customerId,
    number,
    defaultAddress,
    uf,
  }: IRequest) {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Cliente informado não cadastrado :(');
    }

    const address = await this.addressRepository.create({
      cep,
      city,
      customer,
      defaultAddress,
      district,
      name,
      number,
      street,
      uf,
    });

    return address;
  }
}

export default CreateAddressService;
