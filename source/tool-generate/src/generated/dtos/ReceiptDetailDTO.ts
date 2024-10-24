export interface ReceiptDetailDtoCreate {
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

export interface ReceiptDetailDtoUpdate {
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

export interface ReceiptDetailDtoView {
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
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
