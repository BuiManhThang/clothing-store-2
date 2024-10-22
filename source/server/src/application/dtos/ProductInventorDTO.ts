export interface CreateProductInventorDTO {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface UpdateProductInventorDTO {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface ViewProductInventorDTO {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}
