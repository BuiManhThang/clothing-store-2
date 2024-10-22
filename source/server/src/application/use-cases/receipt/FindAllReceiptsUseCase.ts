import { ViewReceiptDTO } from '../../dtos/ReceiptDTO'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'

export class FindAllReceiptsUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptService: IReceiptRepo) {
    this.#receiptRepo = receiptService
  }

  async execute(): Promise<ViewReceiptDTO[]> {
    const receipts = await this.#receiptRepo.findAll()
    return receipts.map((receipt) => ReceiptMapper.toViewReceiptDTO(receipt))
  }
}
