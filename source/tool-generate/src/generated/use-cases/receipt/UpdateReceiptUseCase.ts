import { Receipt } from '../../../domain/entities/Receipt'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateReceiptDTO, ViewReceiptDTO } from '../../dtos/ReceiptDTO'
import { IReceiptRepo } from '../../interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'

export class UpdateReceiptUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptRepo: IReceiptRepo) {
    this.#receiptRepo = receiptRepo
  }

  async execute(id: string, updatereceiptDTO: UpdateReceiptDTO): Promise<ViewReceiptDTO | null> {
    const oldReceipt = await this.#receiptRepo.findById(id)
    if (!oldReceipt) throw new NotFoundError('')

    const receipt: Receipt = {
      id: oldReceipt.id,
      totalMoney: updatereceiptDTO.totalMoney,
      totalProduct: updatereceiptDTO.totalProduct,
      createdUserId: updatereceiptDTO.createdUserId,
      receiptDate: updatereceiptDTO.receiptDate,
      code: updatereceiptDTO.code,
      description: updatereceiptDTO.description,
      status: updatereceiptDTO.status,
      createdAt: oldReceipt.createdAt,
      createdBy: oldReceipt.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedReceipt = await this.#receiptRepo.update(id, receipt)

    if (updatedReceipt) return ReceiptMapper.toViewReceiptDTO(updatedReceipt)
    return null
  }
}
