import { Review } from '../../../domain/entities/Review'
import { CreateReviewDTO, ViewReviewDTO } from '../../dtos/ReviewDTO'
import { IReviewRepo } from '../../interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateReviewUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewRepo: IReviewRepo) {
    this.#reviewRepo = reviewRepo
  }

  async execute(createReviewDto: CreateReviewDTO): Promise<ViewReviewDTO> {
    const review: Review = {
      id: generateUUID(),
      score: createReviewDto.score,
      userId: createReviewDto.userId,
      productId: createReviewDto.productId,
      content: createReviewDto.content,
      createdAt: new Date(),
      createdBy: '',
    }

    const newReview = await this.#reviewRepo.create(review)

    return ReviewMapper.toViewReviewDTO(newReview)
  }
}
