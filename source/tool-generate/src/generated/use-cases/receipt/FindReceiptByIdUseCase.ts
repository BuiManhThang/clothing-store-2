import { ReceiptDtoView } from '../../dtos/ReceiptDto'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'

export class FindReceiptByIdUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptRepo: IReceiptRepo) {
    this.#receiptRepo = receiptRepo
  }

  async execute(id: string): Promise<ReceiptDtoView | null> {
    const receipt = await this.#receiptRepo.findById(id)
    if (!receipt) return null
    return ReceiptMapper.toReceiptDtoView(receipt)
  }
}
