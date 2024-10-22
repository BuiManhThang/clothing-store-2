import { BaseEntity } from './BaseEntity'

export interface ReceiptDetail extends BaseEntity {
  sizeId: string;
  quantity: number;
  price: any;
  receiptId: string;
  productId: string;
  colorId: string;
  productCode: string;
  productName: string;
  colorCode: string;
  colorName: string;
  sizeName: string;
}