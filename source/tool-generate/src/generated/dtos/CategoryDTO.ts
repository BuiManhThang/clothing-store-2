export interface CategoryDtoCreate {
  productCount: number;
  imageId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface CategoryDtoUpdate {
  productCount: number;
  imageId: string;
  status: string;
  code: string;
  name: string;
  description: string;
}

export interface CategoryDtoView {
  productCount: number;
  imageId: string;
  status: string;
  code: string;
  name: string;
  description: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
