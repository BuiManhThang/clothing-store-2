import { Review } from '../../../domain/entities/Review'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateReviewDTO, ViewReviewDTO } from '../../dtos/ReviewDTO'
import { IReviewRepo } from '../../interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'

export class UpdateReviewUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewRepo: IReviewRepo) {
    this.#reviewRepo = reviewRepo
  }

  async execute(id: string, updatereviewDTO: UpdateReviewDTO): Promise<ViewReviewDTO | null> {
    const oldReview = await this.#reviewRepo.findById(id)
    if (!oldReview) throw new NotFoundError('')

    const review: Review = {
      id: oldReview.id,
      score: updatereviewDTO.score,
      userId: updatereviewDTO.userId,
      productId: updatereviewDTO.productId,
      content: updatereviewDTO.content,
      createdAt: oldReview.createdAt,
      createdBy: oldReview.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedReview = await this.#reviewRepo.update(id, review)

    if (updatedReview) return ReviewMapper.toViewReviewDTO(updatedReview)
    return null
  }
}
