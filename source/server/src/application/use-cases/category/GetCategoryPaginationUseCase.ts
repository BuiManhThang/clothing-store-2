import { CategoryDtoView } from '../../dtos/CategoryDto'
import { ICategoryRepo } from '../../../domain/interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Category } from '../../../domain/entities/Category'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetCategoryPaginationUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryRepo: ICategoryRepo) {
    this.#categoryRepo = categoryRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<CategoryDtoView>> {
    const filterObjects: FilterObject<Category>[] = []

    const sortObjects: SortObject<Category>[] = []
    const keysOfCategory: (keyof Category)[] = []
    const sortKey = sort as keyof Category
    if (sort && keysOfCategory.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Category> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#categoryRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<CategoryDtoView> = {
      items: paginationResult.items.map((category) => CategoryMapper.toCategoryDtoView(category)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
