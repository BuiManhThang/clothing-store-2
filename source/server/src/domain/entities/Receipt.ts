import { BaseEntity } from './BaseEntity'

export interface Receipt extends BaseEntity {
  totalMoney: any;
  totalProduct: any;
  createdUserId: string;
  receiptDate: Date;
  code: string;
  description: string;
  status: string;
}