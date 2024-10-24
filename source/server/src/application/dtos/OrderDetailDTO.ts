export interface OrderDetailDtoCreate {
  sizeId: string;
  quantity: number;
  price: any;
  orderId: string;
  productId: string;
  colorId: string;
  productCode: string;
  productName: string;
  colorCode: string;
  colorName: string;
  sizeName: string;
}

export interface OrderDetailDtoUpdate {
  sizeId: string;
  quantity: number;
  price: any;
  orderId: string;
  productId: string;
  colorId: string;
  productCode: string;
  productName: string;
  colorCode: string;
  colorName: string;
  sizeName: string;
}

export interface OrderDetailDtoView {
  sizeId: string;
  quantity: number;
  price: any;
  orderId: string;
  productId: string;
  colorId: string;
  productCode: string;
  productName: string;
  colorCode: string;
  colorName: string;
  sizeName: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
