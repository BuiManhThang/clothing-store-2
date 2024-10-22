export interface CreateReviewDTO {
  score: number;
  userId: string;
  productId: string;
  content: string;
}

export interface UpdateReviewDTO {
  score: number;
  userId: string;
  productId: string;
  content: string;
}

export interface ViewReviewDTO {
  score: number;
  userId: string;
  productId: string;
  content: string;
}
