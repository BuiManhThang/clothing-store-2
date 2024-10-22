import { ProductInventory } from '../../../domain/entities/ProductInventory'
import { IBaseRepo } from './IBaseRepo'

export interface IProductInventoryRepo extends IBaseRepo<ProductInventory> {}
