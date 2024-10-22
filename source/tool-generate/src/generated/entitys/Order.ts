import { BaseEntity } from './BaseEntity'

export interface Order extends BaseEntity {
  orderDate: Date;
  totalMoney: any;
  totalProduct: any;
  couponPercent: any;
  finalTotalMoney: any;
  createdUserId: string;
  couponId: string;
  district: string;
  code: string;
  address: string;
  email: string;
  phoneNumber: string;
  status: string;
  description: string;
  city: string;
}