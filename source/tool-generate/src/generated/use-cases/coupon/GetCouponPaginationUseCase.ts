import { CouponDtoView } from '../../dtos/CouponDto'
import { ICouponRepo } from '../../../domain/interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Coupon } from '../../../domain/entities/Coupon'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetCouponPaginationUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponRepo: ICouponRepo) {
    this.#couponRepo = couponRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<CouponDtoView>> {
    const filterObjects: FilterObject<Coupon>[] = []

    const sortObjects: SortObject<Coupon>[] = []
    const keysOfCoupon: (keyof Coupon)[] = []
    const sortKey = sort as keyof Coupon
    if (sort && keysOfCoupon.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Coupon> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#couponRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<CouponDtoView> = {
      items: paginationResult.items.map((coupon) => CouponMapper.toCouponDtoView(coupon)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
