import { ViewReceiptDetailDTO } from '../../dtos/ReceiptDetailDTO'
import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'

export class FindReceiptDetailByIdUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailRepo: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailRepo
  }

  async execute(id: string): Promise<ViewReceiptDetailDTO | null> {
    const receiptDetail = await this.#receiptDetailRepo.findById(id)
    if (!receiptDetail) return null
    return ReceiptDetailMapper.toViewReceiptDetailDTO(receiptDetail)
  }
}
