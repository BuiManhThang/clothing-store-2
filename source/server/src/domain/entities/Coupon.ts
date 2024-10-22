import { BaseEntity } from './BaseEntity'

export interface Coupon extends BaseEntity {
  percent: any;
  expireDate: Date;
  code: string;
  description: string;
  status: string;
}