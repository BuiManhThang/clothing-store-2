import { BaseEntity } from './BaseEntity'

export interface Token extends BaseEntity {
  userId: string;
  expireDate: Date;
  refreshToken: string;
  device: string;
}