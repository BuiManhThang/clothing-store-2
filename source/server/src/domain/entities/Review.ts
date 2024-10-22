import { BaseEntity } from './BaseEntity'

export interface Review extends BaseEntity {
  score: number;
  userId: string;
  productId: string;
  content: string;
}