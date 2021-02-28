import IProductDTO from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(data: IProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  search(search: string): Promise<Product[]>;
  deleteById(id: string): Promise<void>;
  update(data: Product): Promise<Product>;
}