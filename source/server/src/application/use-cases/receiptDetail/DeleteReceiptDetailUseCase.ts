import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'

export class DeleteReceiptDetailUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailService: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#receiptDetailRepo.delete(id)
  }
}
