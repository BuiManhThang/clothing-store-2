import { BaseEntity } from './BaseEntity'

export interface ProductImage extends BaseEntity {
  productId: string;
  imageId: string;
  description: string;
}