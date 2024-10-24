import { ProductInventoryDtoView } from '../../dtos/ProductInventoryDto'
import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { ProductInventory } from '../../../domain/entities/ProductInventory'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetProductInventoryPaginationUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryRepo: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ProductInventoryDtoView>> {
    const filterObjects: FilterObject<ProductInventory>[] = []

    const sortObjects: SortObject<ProductInventory>[] = []
    const keysOfProductInventory: (keyof ProductInventory)[] = []
    const sortKey = sort as keyof ProductInventory
    if (sort && keysOfProductInventory.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<ProductInventory> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#productInventoryRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ProductInventoryDtoView> = {
      items: paginationResult.items.map((productInventory) => ProductInventoryMapper.toProductInventoryDtoView(productInventory)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
