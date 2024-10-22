import { BaseEntity } from './BaseEntity'

export interface ProductInventor extends BaseEntity {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}