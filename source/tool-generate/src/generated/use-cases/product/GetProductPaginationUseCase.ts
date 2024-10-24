import { ProductDtoView } from '../../dtos/ProductDto'
import { IProductRepo } from '../../../domain/interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Product } from '../../../domain/entities/Product'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetProductPaginationUseCase {
  readonly #productRepo: IProductRepo

  constructor(productRepo: IProductRepo) {
    this.#productRepo = productRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ProductDtoView>> {
    const filterObjects: FilterObject<Product>[] = []

    const sortObjects: SortObject<Product>[] = []
    const keysOfProduct: (keyof Product)[] = []
    const sortKey = sort as keyof Product
    if (sort && keysOfProduct.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Product> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#productRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ProductDtoView> = {
      items: paginationResult.items.map((product) => ProductMapper.toProductDtoView(product)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
