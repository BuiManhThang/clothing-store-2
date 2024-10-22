import { ViewReceiptDTO } from '../../dtos/ReceiptDTO'
import { IReceiptRepo } from '../../interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'

export class FindAllReceiptUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptService: IReceiptRepo) {
    this.#receiptRepo = receiptService
  }

  async execute(): Promise<ViewReceiptDTO[]> {
    const receipt = await this.#receiptRepo.findAll()
    return receipt.map((receipt) => ReceiptMapper.toViewReceiptDTO(receipt))
  }
}
