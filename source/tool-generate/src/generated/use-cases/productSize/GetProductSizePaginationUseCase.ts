import { ProductSizeDtoView } from '../../dtos/ProductSizeDto'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { ProductSize } from '../../../domain/entities/ProductSize'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetProductSizePaginationUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeRepo: IProductSizeRepo) {
    this.#productSizeRepo = productSizeRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ProductSizeDtoView>> {
    const filterObjects: FilterObject<ProductSize>[] = []

    const sortObjects: SortObject<ProductSize>[] = []
    const keysOfProductSize: (keyof ProductSize)[] = []
    const sortKey = sort as keyof ProductSize
    if (sort && keysOfProductSize.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<ProductSize> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#productSizeRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ProductSizeDtoView> = {
      items: paginationResult.items.map((productSize) => ProductSizeMapper.toProductSizeDtoView(productSize)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
