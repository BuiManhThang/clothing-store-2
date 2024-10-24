import { ProductImageDtoView } from '../../dtos/ProductImageDto'
import { IProductImageRepo } from '../../../domain/interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { ProductImage } from '../../../domain/entities/ProductImage'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetProductImagePaginationUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageRepo: IProductImageRepo) {
    this.#productImageRepo = productImageRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ProductImageDtoView>> {
    const filterObjects: FilterObject<ProductImage>[] = []

    const sortObjects: SortObject<ProductImage>[] = []
    const keysOfProductImage: (keyof ProductImage)[] = []
    const sortKey = sort as keyof ProductImage
    if (sort && keysOfProductImage.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<ProductImage> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#productImageRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ProductImageDtoView> = {
      items: paginationResult.items.map((productImage) => ProductImageMapper.toProductImageDtoView(productImage)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
