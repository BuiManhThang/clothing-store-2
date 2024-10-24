import { Receipt } from '../../../domain/entities/Receipt'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ReceiptDtoUpdate, ReceiptDtoView } from '../../dtos/ReceiptDto'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateReceiptUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptRepo: IReceiptRepo) {
    this.#receiptRepo = receiptRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatereceiptDto: ReceiptDtoUpdate): Promise<ReceiptDtoView | null> {
    const oldReceipt = await this.#receiptRepo.findById(id)
    if (!oldReceipt) throw new NotFoundError('')

    const receipt: Receipt = {
      id: oldReceipt.id,
      totalMoney: updatereceiptDto.totalMoney,
      totalProduct: updatereceiptDto.totalProduct,
      createdUserId: updatereceiptDto.createdUserId,
      receiptDate: updatereceiptDto.receiptDate,
      code: updatereceiptDto.code,
      description: updatereceiptDto.description,
      status: updatereceiptDto.status,
      createdAt: oldReceipt.createdAt,
      createdBy: oldReceipt.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedReceipt = await this.#receiptRepo.update(id, receipt)

    if (updatedReceipt) return ReceiptMapper.toReceiptDtoView(updatedReceipt)
    return null
  }
}
