import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomerDTO {
  name: string;
  street: string;
  district: string;
  uf: string;
  city: string;
  cep: string;
  defaultAddress: boolean;
  customer: Customer;
  number: string;
}
