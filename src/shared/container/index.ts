import { container } from 'tsyringe';

import CollectionRepository from '@modules/Collection/infra/typeorm/repositories/CollectionRepository';
import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';

import ProductRepository from '@modules/Product/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/Product/repositories/IProductRepository';

import UsersRepository from '@modules/User/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';

import CustomersRepository from '@modules/Customer/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '@modules/Customer/repositories/ICustomersRepository';

import BlacklistRepositorie from './../infra/typeorm/repositories/BlacklistRepositorie';
import IBlacklistRepositorie from './../repositories/IBlacklistRepositorie';

import AddressRepository from '@modules/Customer/infra/typeorm/repositories/AddressRepository';
import IAddressRepository from '@modules/Customer/repositories/IAddressRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<IBlacklistRepositorie>(
  'BlacklistRepository',
  BlacklistRepositorie,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<ICollectionRepository>(
  'CollectionsRepository',
  CollectionRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductRepository,
);
