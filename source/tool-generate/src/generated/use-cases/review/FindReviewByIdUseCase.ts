import { ViewReviewDTO } from '../../dtos/ReviewDTO'
import { IReviewRepo } from '../../interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'

export class FindReviewByIdUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewRepo: IReviewRepo) {
    this.#reviewRepo = reviewRepo
  }

  async execute(id: string): Promise<ViewReviewDTO | null> {
    const review = await this.#reviewRepo.findById(id)
    if (!review) return null
    return ReviewMapper.toViewReviewDTO(review)
  }
}
