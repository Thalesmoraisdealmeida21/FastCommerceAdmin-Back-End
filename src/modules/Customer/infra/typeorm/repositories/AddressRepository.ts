import IAddressDTO from '@modules/Customer/dtos/IAddressDTO';
import IAddressRepository from '@modules/Customer/repositories/IAddressRepository';
import { getRepository, Repository } from 'typeorm';
import Address from '../entities/Address';
import Customer from '../entities/Customer';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(data: IAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(data);

    await this.ormRepository.save(address);

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);

    return address;
  }

  public async findByUserId(customer: Customer): Promise<Address[]> {
    const adresses = await this.ormRepository.find({
      where: {
        customer: customer,
      },
    });

    return adresses;
  }

  public async save(address: Address): Promise<void> {
    await this.ormRepository.save(address);
  }

  public async delete(address: Address): Promise<void> {
    await this.ormRepository.delete(address.id);
  }
}

export default AddressRepository;
