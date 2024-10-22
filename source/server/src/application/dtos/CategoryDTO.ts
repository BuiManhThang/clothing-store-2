export interface CreateCategoryDTO {
  productCount: number;
  imageId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface UpdateCategoryDTO {
  productCount: number;
  imageId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface ViewCategoryDTO {
  productCount: number;
  imageId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}
