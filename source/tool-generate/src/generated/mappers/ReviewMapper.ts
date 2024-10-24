import { Review } from '../../domain/entities/Review'
import { ReviewDtoView } from '../dtos/ReviewDto'

export class ReviewMapper {
  static toReviewDtoView(review: Review): ReviewDtoView {
    return review
  }
}
