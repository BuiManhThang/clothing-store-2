import { ReviewDtoView } from '../../dtos/ReviewDto'
import { IReviewRepo } from '../../../domain/interfaces/repositories/IReviewRepo'
import { ReviewMapper } from '../../mappers/ReviewMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Review } from '../../../domain/entities/Review'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetReviewPaginationUseCase {
  readonly #reviewRepo: IReviewRepo

  constructor(reviewRepo: IReviewRepo) {
    this.#reviewRepo = reviewRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ReviewDtoView>> {
    const filterObjects: FilterObject<Review>[] = []

    const sortObjects: SortObject<Review>[] = []
    const keysOfReview: (keyof Review)[] = []
    const sortKey = sort as keyof Review
    if (sort && keysOfReview.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Review> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#reviewRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ReviewDtoView> = {
      items: paginationResult.items.map((review) => ReviewMapper.toReviewDtoView(review)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
