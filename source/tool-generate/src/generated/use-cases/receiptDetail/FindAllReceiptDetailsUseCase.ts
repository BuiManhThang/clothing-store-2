import { ViewReceiptDetailDTO } from '../../dtos/ReceiptDetailDTO'
import { IReceiptDetailRepo } from '../../interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'

export class FindAllReceiptDetailsUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailService: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailService
  }

  async execute(): Promise<ViewReceiptDetailDTO[]> {
    const receiptDetails = await this.#receiptDetailRepo.findAll()
    return receiptDetails.map((receiptDetail) => ReceiptDetailMapper.toViewReceiptDetailDTO(receiptDetail))
  }
}
