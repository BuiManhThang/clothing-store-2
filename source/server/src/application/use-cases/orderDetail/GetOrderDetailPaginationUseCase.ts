import { OrderDetailDtoView } from '../../dtos/OrderDetailDto'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { OrderDetail } from '../../../domain/entities/OrderDetail'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetOrderDetailPaginationUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailRepo: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<OrderDetailDtoView>> {
    const filterObjects: FilterObject<OrderDetail>[] = []

    const sortObjects: SortObject<OrderDetail>[] = []
    const keysOfOrderDetail: (keyof OrderDetail)[] = []
    const sortKey = sort as keyof OrderDetail
    if (sort && keysOfOrderDetail.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<OrderDetail> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#orderDetailRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<OrderDetailDtoView> = {
      items: paginationResult.items.map((orderDetail) => OrderDetailMapper.toOrderDetailDtoView(orderDetail)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
