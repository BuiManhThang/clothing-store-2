export interface CreateCardDTO {
  quantity: number;
  colorId: string;
  sizeId: string;
  userId: string;
  productId: string;
}

export interface UpdateCardDTO {
  quantity: number;
  colorId: string;
  sizeId: string;
  userId: string;
  productId: string;
}

export interface ViewCardDTO {
  quantity: number;
  colorId: string;
  sizeId: string;
  userId: string;
  productId: string;
}
