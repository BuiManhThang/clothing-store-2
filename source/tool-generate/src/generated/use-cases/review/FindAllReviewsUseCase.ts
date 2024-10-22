import { ViewReviewDTO } from '../../dtos/ReviewDTO'
import { IReviewRepo } from '../../interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'

export class FindAllReviewsUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewService: IReviewRepo) {
    this.#reviewRepo = reviewService
  }

  async execute(): Promise<ViewReviewDTO[]> {
    const reviews = await this.#reviewRepo.findAll()
    return reviews.map((review) => ReviewMapper.toViewReviewDTO(review))
  }
}
