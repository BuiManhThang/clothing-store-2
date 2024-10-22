import { Review } from '../../domain/entities/Review'
import { ViewReviewDTO } from '../dtos/ReviewDTO'

export class ReviewMapper {
  static toViewReviewDTO(review: Review): ViewReviewDTO {
    return review
  }
}
