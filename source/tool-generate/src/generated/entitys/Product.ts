import { BaseEntity } from './BaseEntity'

export interface Product extends BaseEntity {
  categoryId: string;
  avatarId: string;
  code: string;
  name: string;
  description: string;
  status: string;
}