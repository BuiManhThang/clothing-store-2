import { BaseEntity } from './BaseEntity'

export interface ProductInventory extends BaseEntity {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}