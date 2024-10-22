import { ViewReviewDTO } from '../../dtos/ReviewDTO'
import { IReviewRepo } from '../../interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'

export class FindAllReviewUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewService: IReviewRepo) {
    this.#reviewRepo = reviewService
  }

  async execute(): Promise<ViewReviewDTO[]> {
    const review = await this.#reviewRepo.findAll()
    return review.map((review) => ReviewMapper.toViewReviewDTO(review))
  }
}
