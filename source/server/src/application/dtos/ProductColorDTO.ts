export interface CreateProductColorDTO {
  order: number;
  productId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface UpdateProductColorDTO {
  order: number;
  productId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface ViewProductColorDTO {
  order: number;
  productId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}
