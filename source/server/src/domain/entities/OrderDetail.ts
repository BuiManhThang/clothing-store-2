import { BaseEntity } from './BaseEntity'

export interface OrderDetail extends BaseEntity {
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