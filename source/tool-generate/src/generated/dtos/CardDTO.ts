export interface CardDtoCreate {
  quantity: number;
  colorId: string;
  sizeId: string;
  userId: string;
  productId: string;
}

export interface CardDtoUpdate {
  quantity: number;
  colorId: string;
  sizeId: string;
  userId: string;
  productId: string;
}

export interface CardDtoView {
  quantity: number;
  colorId: string;
  sizeId: string;
  userId: string;
  productId: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
