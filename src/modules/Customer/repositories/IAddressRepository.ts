import IAddressDTO from '../dtos/IAddressDTO';
import Address from '../infra/typeorm/entities/Address';
import Customer from '../infra/typeorm/entities/Customer';

export default interface IAddressRepository {
  create(data: IAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address | undefined>;
  findByUserId(customer: Customer): Promise<Address[]>;
  save(address: Address): Promise<void>;
  delete(address: Address): Promise<void>;
}
