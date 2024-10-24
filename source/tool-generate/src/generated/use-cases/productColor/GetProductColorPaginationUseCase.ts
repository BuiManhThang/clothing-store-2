import { ProductColorDtoView } from '../../dtos/ProductColorDto'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { ProductColor } from '../../../domain/entities/ProductColor'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetProductColorPaginationUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorRepo: IProductColorRepo) {
    this.#productColorRepo = productColorRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ProductColorDtoView>> {
    const filterObjects: FilterObject<ProductColor>[] = []

    const sortObjects: SortObject<ProductColor>[] = []
    const keysOfProductColor: (keyof ProductColor)[] = []
    const sortKey = sort as keyof ProductColor
    if (sort && keysOfProductColor.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<ProductColor> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#productColorRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ProductColorDtoView> = {
      items: paginationResult.items.map((productColor) => ProductColorMapper.toProductColorDtoView(productColor)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
