export interface ProductImageDtoCreate {
  productId: string;
  imageId: string;
  description: string;
}

export interface ProductImageDtoUpdate {
  productId: string;
  imageId: string;
  description: string;
}

export interface ProductImageDtoView {
  productId: string;
  imageId: string;
  description: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
