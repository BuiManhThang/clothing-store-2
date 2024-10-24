import { ReviewDtoView } from '../../dtos/ReviewDto'
import { IReviewRepo } from '../../../domain/interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'

export class FindReviewByIdUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewRepo: IReviewRepo) {
    this.#reviewRepo = reviewRepo
  }

  async execute(id: string): Promise<ReviewDtoView | null> {
    const review = await this.#reviewRepo.findById(id)
    if (!review) return null
    return ReviewMapper.toReviewDtoView(review)
  }
}
