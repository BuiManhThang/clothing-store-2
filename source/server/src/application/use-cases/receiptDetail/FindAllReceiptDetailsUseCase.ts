import { ReceiptDetailDtoView } from '../../dtos/ReceiptDetailDto'
import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'

export class FindAllReceiptDetailsUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailService: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailService
  }

  async execute(): Promise<ReceiptDetailDtoView[]> {
    const receiptDetails = await this.#receiptDetailRepo.findAll()
    return receiptDetails.map((receiptDetail) => ReceiptDetailMapper.toReceiptDetailDtoView(receiptDetail))
  }
}
