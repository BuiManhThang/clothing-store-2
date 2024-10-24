import { ReviewDtoView } from '../../dtos/ReviewDto'
import { IReviewRepo } from '../../../domain/interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'

export class FindAllReviewsUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewService: IReviewRepo) {
    this.#reviewRepo = reviewService
  }

  async execute(): Promise<ReviewDtoView[]> {
    const reviews = await this.#reviewRepo.findAll()
    return reviews.map((review) => ReviewMapper.toReviewDtoView(review))
  }
}
