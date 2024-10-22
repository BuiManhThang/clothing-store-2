import { Product } from '../../entities/Product'
import { IBaseRepo } from './IBaseRepo'

export interface IProductRepo extends IBaseRepo<Product> {}
