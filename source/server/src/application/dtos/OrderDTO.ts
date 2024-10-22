export interface CreateOrderDTO {
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

export interface UpdateOrderDTO {
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

export interface ViewOrderDTO {
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
