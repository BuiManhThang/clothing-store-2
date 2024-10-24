import { TokenDtoView } from '../../dtos/TokenDto'
import { ITokenRepo } from '../../../domain/interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Token } from '../../../domain/entities/Token'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetTokenPaginationUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenRepo: ITokenRepo) {
    this.#tokenRepo = tokenRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<TokenDtoView>> {
    const filterObjects: FilterObject<Token>[] = []

    const sortObjects: SortObject<Token>[] = []
    const keysOfToken: (keyof Token)[] = []
    const sortKey = sort as keyof Token
    if (sort && keysOfToken.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Token> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#tokenRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<TokenDtoView> = {
      items: paginationResult.items.map((token) => TokenMapper.toTokenDtoView(token)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
