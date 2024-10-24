export interface ProductColorDtoCreate {
  order: number;
  productId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface ProductColorDtoUpdate {
  order: number;
  productId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface ProductColorDtoView {
  order: number;
  productId: string;
  status: string;
  code: string;
  name: string;
  description: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
