import { ReceiptDetail } from '../../../domain/entities/ReceiptDetail'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ReceiptDetailDtoUpdate, ReceiptDetailDtoView } from '../../dtos/ReceiptDetailDto'
import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateReceiptDetailUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailRepo: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatereceiptDetailDto: ReceiptDetailDtoUpdate): Promise<ReceiptDetailDtoView | null> {
    const oldReceiptDetail = await this.#receiptDetailRepo.findById(id)
    if (!oldReceiptDetail) throw new NotFoundError('')

    const receiptDetail: ReceiptDetail = {
      id: oldReceiptDetail.id,
      sizeId: updatereceiptDetailDto.sizeId,
      quantity: updatereceiptDetailDto.quantity,
      price: updatereceiptDetailDto.price,
      receiptId: updatereceiptDetailDto.receiptId,
      productId: updatereceiptDetailDto.productId,
      colorId: updatereceiptDetailDto.colorId,
      productCode: updatereceiptDetailDto.productCode,
      productName: updatereceiptDetailDto.productName,
      colorCode: updatereceiptDetailDto.colorCode,
      colorName: updatereceiptDetailDto.colorName,
      sizeName: updatereceiptDetailDto.sizeName,
      createdAt: oldReceiptDetail.createdAt,
      createdBy: oldReceiptDetail.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedReceiptDetail = await this.#receiptDetailRepo.update(id, receiptDetail)

    if (updatedReceiptDetail) return ReceiptDetailMapper.toReceiptDetailDtoView(updatedReceiptDetail)
    return null
  }
}
