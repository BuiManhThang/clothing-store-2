import { ReceiptDtoView } from '../../dtos/ReceiptDto'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'

export class FindAllReceiptsUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptService: IReceiptRepo) {
    this.#receiptRepo = receiptService
  }

  async execute(): Promise<ReceiptDtoView[]> {
    const receipts = await this.#receiptRepo.findAll()
    return receipts.map((receipt) => ReceiptMapper.toReceiptDtoView(receipt))
  }
}
