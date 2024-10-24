import { Receipt } from '../../../domain/entities/Receipt'
import { ReceiptDtoCreate, ReceiptDtoView } from '../../dtos/ReceiptDto'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateReceiptUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptRepo: IReceiptRepo) {
    this.#receiptRepo = receiptRepo
  }

  async execute(userContextService: IUserContextService | undefined, createReceiptDto: ReceiptDtoCreate): Promise<ReceiptDtoView> {
    const receipt: Receipt = {
      id: generateUUID(),
      totalMoney: createReceiptDto.totalMoney,
      totalProduct: createReceiptDto.totalProduct,
      createdUserId: createReceiptDto.createdUserId,
      receiptDate: createReceiptDto.receiptDate,
      code: createReceiptDto.code,
      description: createReceiptDto.description,
      status: createReceiptDto.status,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newReceipt = await this.#receiptRepo.create(receipt)

    return ReceiptMapper.toReceiptDtoView(newReceipt)
  }
}
