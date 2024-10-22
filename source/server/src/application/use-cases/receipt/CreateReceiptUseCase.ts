import { Receipt } from '../../../domain/entities/Receipt'
import { CreateReceiptDTO, ViewReceiptDTO } from '../../dtos/ReceiptDTO'
import { IReceiptRepo } from '../../../domain/interfaces/repositories/IReceiptRepo'
import { ReceiptMapper } from '../../mappers/ReceiptMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateReceiptUseCase {
  readonly #receiptRepo: IReceiptRepo

  constructor(receiptRepo: IReceiptRepo) {
    this.#receiptRepo = receiptRepo
  }

  async execute(createReceiptDto: CreateReceiptDTO): Promise<ViewReceiptDTO> {
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
      createdBy: '',
    }

    const newReceipt = await this.#receiptRepo.create(receipt)

    return ReceiptMapper.toViewReceiptDTO(newReceipt)
  }
}
