import { ViewReceiptDetailDTO } from '../../dtos/ReceiptDetailDTO'
import { IReceiptDetailRepo } from '../../interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'

export class FindAllReceiptDetailUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailService: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailService
  }

  async execute(): Promise<ViewReceiptDetailDTO[]> {
    const receiptDetail = await this.#receiptDetailRepo.findAll()
    return receiptDetail.map((receiptDetail) => ReceiptDetailMapper.toViewReceiptDetailDTO(receiptDetail))
  }
}
