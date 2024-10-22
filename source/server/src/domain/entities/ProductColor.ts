import { BaseEntity } from './BaseEntity'

export interface ProductColor extends BaseEntity {
  order: number;
  productId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}