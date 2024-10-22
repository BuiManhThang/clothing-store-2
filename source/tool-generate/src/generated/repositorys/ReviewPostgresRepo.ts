import { IReviewRepo } from '../../application/interfaces/repositories/IReviewRepo'
import { Review } from '../../domain/entities/Review'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ReviewPostgresRepo extends BasePostgresRepo<Review> implements IReviewRepo {
  constructor() {
    super('reviews')
  }
}
