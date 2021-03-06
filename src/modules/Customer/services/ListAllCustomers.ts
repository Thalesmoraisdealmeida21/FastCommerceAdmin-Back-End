import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(page: number) {
    console.log(page);
    const customers = await this.customersRepository.findAllCustomers(page);

    const pageInitials = customers[1] / 8;

    const pages = Math.trunc(pageInitials) + 1;

    console.log(pages);

    return { customers: customers[0], totalPages: pages };
  }
}

export default ListAllCustomersService;
