import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'

export class DeleteReceiptUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptService: IReceiptRepo) {
    this.#receiptRepo = receiptService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#receiptRepo.delete(id)
  }
}
