import { CardDtoView } from '../../dtos/CardDto'
import { ICardRepo } from '../../../domain/interfaces/repositories/ICardRepo'
import { CardMapper } from '../../mappers/CardMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Card } from '../../../domain/entities/Card'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetCardPaginationUseCase {
  readonly #cardRepo: ICardRepo

  constructor(cardRepo: ICardRepo) {
    this.#cardRepo = cardRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<CardDtoView>> {
    const filterObjects: FilterObject<Card>[] = []

    const sortObjects: SortObject<Card>[] = []
    const keysOfCard: (keyof Card)[] = []
    const sortKey = sort as keyof Card
    if (sort && keysOfCard.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Card> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#cardRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<CardDtoView> = {
      items: paginationResult.items.map((card) => CardMapper.toCardDtoView(card)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
