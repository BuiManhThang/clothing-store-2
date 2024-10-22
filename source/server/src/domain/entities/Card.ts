import { BaseEntity } from './BaseEntity'

export interface Card extends BaseEntity {
  quantity: number;
  colorId: string;
  sizeId: string;
  userId: string;
  productId: string;
}