import { ViewReceiptDTO } from '../../dtos/ReceiptDTO'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'

export class FindReceiptByIdUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptRepo: IReceiptRepo) {
    this.#receiptRepo = receiptRepo
  }

  async execute(id: string): Promise<ViewReceiptDTO | null> {
    const receipt = await this.#receiptRepo.findById(id)
    if (!receipt) return null
    return ReceiptMapper.toViewReceiptDTO(receipt)
  }
}
