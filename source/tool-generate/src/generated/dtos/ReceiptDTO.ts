export interface ReceiptDtoCreate {
  totalMoney: any;
  totalProduct: any;
  createdUserId: string;
  receiptDate: Date;
  code: string;
  description: string;
  status: string;
}

export interface ReceiptDtoUpdate {
  totalMoney: any;
  totalProduct: any;
  createdUserId: string;
  receiptDate: Date;
  code: string;
  description: string;
  status: string;
}

export interface ReceiptDtoView {
  totalMoney: any;
  totalProduct: any;
  createdUserId: string;
  receiptDate: Date;
  code: string;
  description: string;
  status: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
