export interface ProductInventoryDtoCreate {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface ProductInventoryDtoUpdate {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface ProductInventoryDtoView {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
