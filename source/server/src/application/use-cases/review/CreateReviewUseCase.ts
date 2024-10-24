import { Review } from '../../../domain/entities/Review'
import { ReviewDtoCreate, ReviewDtoView } from '../../dtos/ReviewDto'
import { IReviewRepo } from '../../../domain/interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateReviewUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewRepo: IReviewRepo) {
    this.#reviewRepo = reviewRepo
  }

  async execute(userContextService: IUserContextService | undefined, createReviewDto: ReviewDtoCreate): Promise<ReviewDtoView> {
    const review: Review = {
      id: generateUUID(),
      score: createReviewDto.score,
      userId: createReviewDto.userId,
      productId: createReviewDto.productId,
      content: createReviewDto.content,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newReview = await this.#reviewRepo.create(review)

    return ReviewMapper.toReviewDtoView(newReview)
  }
}
