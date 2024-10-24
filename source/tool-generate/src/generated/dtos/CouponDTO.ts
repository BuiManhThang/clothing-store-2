export interface CouponDtoCreate {
  percent: any;
  expireDate: Date;
  code: string;
  description: string;
  status: string;
}

export interface CouponDtoUpdate {
  percent: any;
  expireDate: Date;
  code: string;
  description: string;
  status: string;
}

export interface CouponDtoView {
  percent: any;
  expireDate: Date;
  code: string;
  description: string;
  status: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
