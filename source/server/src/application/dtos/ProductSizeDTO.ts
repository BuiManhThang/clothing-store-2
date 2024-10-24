export interface ProductSizeDtoCreate {
  productId: string;
  order: number;
  name: string;
  description: string;
  status: string;
}

export interface ProductSizeDtoUpdate {
  productId: string;
  order: number;
  name: string;
  description: string;
  status: string;
}

export interface ProductSizeDtoView {
  productId: string;
  order: number;
  name: string;
  description: string;
  status: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
