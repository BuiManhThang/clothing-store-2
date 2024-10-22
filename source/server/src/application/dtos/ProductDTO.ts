export interface CreateProductDTO {
  categoryId: string;
  avatarId: string;
  code: string;
  name: string;
  description: string;
  status: string;
}

export interface UpdateProductDTO {
  categoryId: string;
  avatarId: string;
  code: string;
  name: string;
  description: string;
  status: string;
}

export interface ViewProductDTO {
  categoryId: string;
  avatarId: string;
  code: string;
  name: string;
  description: string;
  status: string;
}
