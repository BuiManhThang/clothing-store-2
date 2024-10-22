import { ReceiptDetail } from '../../../domain/entities/ReceiptDetail'
import { CreateReceiptDetailDTO, ViewReceiptDetailDTO } from '../../dtos/ReceiptDetailDTO'
import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateReceiptDetailUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailRepo: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailRepo
  }

  async execute(createReceiptDetailDto: CreateReceiptDetailDTO): Promise<ViewReceiptDetailDTO> {
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
      createdBy: '',
    }

    const newReceiptDetail = await this.#receiptDetailRepo.create(receiptDetail)

    return ReceiptDetailMapper.toViewReceiptDetailDTO(newReceiptDetail)
  }
}
