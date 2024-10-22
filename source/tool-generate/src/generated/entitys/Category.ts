import { BaseEntity } from './BaseEntity'

export interface Category extends BaseEntity {
  productCount: number;
  imageId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}