export interface ReviewDtoCreate {
  score: number;
  userId: string;
  productId: string;
  content: string;
}

export interface ReviewDtoUpdate {
  score: number;
  userId: string;
  productId: string;
  content: string;
}

export interface ReviewDtoView {
  score: number;
  userId: string;
  productId: string;
  content: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
