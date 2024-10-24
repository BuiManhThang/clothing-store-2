import { ReceiptDtoView } from '../../dtos/ReceiptDto'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Receipt } from '../../../domain/entities/Receipt'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetReceiptPaginationUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptRepo: IReceiptRepo) {
    this.#receiptRepo = receiptRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ReceiptDtoView>> {
    const filterObjects: FilterObject<Receipt>[] = []

    const sortObjects: SortObject<Receipt>[] = []
    const keysOfReceipt: (keyof Receipt)[] = []
    const sortKey = sort as keyof Receipt
    if (sort && keysOfReceipt.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Receipt> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#receiptRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ReceiptDtoView> = {
      items: paginationResult.items.map((receipt) => ReceiptMapper.toReceiptDtoView(receipt)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
