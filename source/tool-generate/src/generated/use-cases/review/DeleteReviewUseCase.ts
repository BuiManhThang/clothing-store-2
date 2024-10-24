import { IReviewRepo } from '../../../domain/interfaces/repositories/IReviewRepo'

export class DeleteReviewUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewService: IReviewRepo) {
    this.#reviewRepo = reviewService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#reviewRepo.delete(id)
  }
}
