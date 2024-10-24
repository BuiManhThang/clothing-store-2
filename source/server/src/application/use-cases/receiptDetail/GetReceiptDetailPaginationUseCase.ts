import { ReceiptDetailDtoView } from '../../dtos/ReceiptDetailDto'
import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { ReceiptDetail } from '../../../domain/entities/ReceiptDetail'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetReceiptDetailPaginationUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailRepo: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<ReceiptDetailDtoView>> {
    const filterObjects: FilterObject<ReceiptDetail>[] = []

    const sortObjects: SortObject<ReceiptDetail>[] = []
    const keysOfReceiptDetail: (keyof ReceiptDetail)[] = []
    const sortKey = sort as keyof ReceiptDetail
    if (sort && keysOfReceiptDetail.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<ReceiptDetail> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#receiptDetailRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<ReceiptDetailDtoView> = {
      items: paginationResult.items.map((receiptDetail) => ReceiptDetailMapper.toReceiptDetailDtoView(receiptDetail)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
