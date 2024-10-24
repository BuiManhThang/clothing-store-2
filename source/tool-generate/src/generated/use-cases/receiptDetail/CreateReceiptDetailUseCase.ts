import { ReceiptDetail } from '../../../domain/entities/ReceiptDetail'
import { ReceiptDetailDtoCreate, ReceiptDetailDtoView } from '../../dtos/ReceiptDetailDto'
import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateReceiptDetailUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailRepo: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailRepo
  }

  async execute(userContextService: IUserContextService | undefined, createReceiptDetailDto: ReceiptDetailDtoCreate): Promise<ReceiptDetailDtoView> {
    const receiptDetail: ReceiptDetail = {
      id: generateUUID(),
      sizeId: createReceiptDetailDto.sizeId,
      quantity: createReceiptDetailDto.quantity,
      price: createReceiptDetailDto.price,
      receiptId: createReceiptDetailDto.receiptId,
      productId: createReceiptDetailDto.productId,
      colorId: createReceiptDetailDto.colorId,
      productCode: createReceiptDetailDto.productCode,
      productName: createReceiptDetailDto.productName,
      colorCode: createReceiptDetailDto.colorCode,
      colorName: createReceiptDetailDto.colorName,
      sizeName: createReceiptDetailDto.sizeName,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newReceiptDetail = await this.#receiptDetailRepo.create(receiptDetail)

    return ReceiptDetailMapper.toReceiptDetailDtoView(newReceiptDetail)
  }
}
