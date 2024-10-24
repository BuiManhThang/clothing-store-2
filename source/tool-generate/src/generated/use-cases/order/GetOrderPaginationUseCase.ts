import { OrderDtoView } from '../../dtos/OrderDto'
import { IOrderRepo } from '../../../domain/interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Order } from '../../../domain/entities/Order'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetOrderPaginationUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderRepo: IOrderRepo) {
    this.#orderRepo = orderRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<OrderDtoView>> {
    const filterObjects: FilterObject<Order>[] = []

    const sortObjects: SortObject<Order>[] = []
    const keysOfOrder: (keyof Order)[] = []
    const sortKey = sort as keyof Order
    if (sort && keysOfOrder.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Order> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#orderRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<OrderDtoView> = {
      items: paginationResult.items.map((order) => OrderMapper.toOrderDtoView(order)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
