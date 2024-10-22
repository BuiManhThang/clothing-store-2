import { BaseEntity } from './BaseEntity'

export interface ProductSize extends BaseEntity {
  productId: string;
  order: number;
  name: string;
  description: string;
  status: string;
}