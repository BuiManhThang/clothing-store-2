import { Review } from '../../../domain/entities/Review'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ReviewDtoUpdate, ReviewDtoView } from '../../dtos/ReviewDto'
import { IReviewRepo } from '../../../domain/interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateReviewUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewRepo: IReviewRepo) {
    this.#reviewRepo = reviewRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatereviewDto: ReviewDtoUpdate): Promise<ReviewDtoView | null> {
    const oldReview = await this.#reviewRepo.findById(id)
    if (!oldReview) throw new NotFoundError('')

    const review: Review = {
      id: oldReview.id,
      score: updatereviewDto.score,
      userId: updatereviewDto.userId,
      productId: updatereviewDto.productId,
      content: updatereviewDto.content,
      createdAt: oldReview.createdAt,
      createdBy: oldReview.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedReview = await this.#reviewRepo.update(id, review)

    if (updatedReview) return ReviewMapper.toReviewDtoView(updatedReview)
    return null
  }
}
