export interface OrderDtoCreate {
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

export interface OrderDtoUpdate {
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

export interface OrderDtoView {
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
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
