export interface CreateProductInventoryDTO {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface UpdateProductInventoryDTO {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface ViewProductInventoryDTO {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}
