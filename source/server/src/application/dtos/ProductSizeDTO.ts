export interface CreateProductSizeDTO {
  productId: string;
  order: number;
  name: string;
  description: string;
  status: string;
}

export interface UpdateProductSizeDTO {
  productId: string;
  order: number;
  name: string;
  description: string;
  status: string;
}

export interface ViewProductSizeDTO {
  productId: string;
  order: number;
  name: string;
  description: string;
  status: string;
}
