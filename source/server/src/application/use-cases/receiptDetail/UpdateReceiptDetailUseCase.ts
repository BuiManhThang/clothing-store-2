import { ReceiptDetail } from '../../../domain/entities/ReceiptDetail'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateReceiptDetailDTO, ViewReceiptDetailDTO } from '../../dtos/ReceiptDetailDTO'
import { IReceiptDetailRepo } from '../../../domain/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetailMapper } from '../../mappers/ReceiptDetailMapper'

export class UpdateReceiptDetailUseCase {
  readonly #receiptDetailRepo: IReceiptDetailRepo

  constructor(receiptDetailRepo: IReceiptDetailRepo) {
    this.#receiptDetailRepo = receiptDetailRepo
  }

  async execute(
    id: string,
    updatereceiptDetailDTO: UpdateReceiptDetailDTO
  ): Promise<ViewReceiptDetailDTO | null> {
    const oldReceiptDetail = await this.#receiptDetailRepo.findById(id)
    if (!oldReceiptDetail) throw new NotFoundError('')

    const receiptDetail: ReceiptDetail = {
      id: oldReceiptDetail.id,
      sizeId: updatereceiptDetailDTO.sizeId,
      quantity: updatereceiptDetailDTO.quantity,
      price: updatereceiptDetailDTO.price,
      receiptId: updatereceiptDetailDTO.receiptId,
      productId: updatereceiptDetailDTO.productId,
      colorId: updatereceiptDetailDTO.colorId,
      productCode: updatereceiptDetailDTO.productCode,
      productName: updatereceiptDetailDTO.productName,
      colorCode: updatereceiptDetailDTO.colorCode,
      colorName: updatereceiptDetailDTO.colorName,
      sizeName: updatereceiptDetailDTO.sizeName,
      createdAt: oldReceiptDetail.createdAt,
      createdBy: oldReceiptDetail.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedReceiptDetail = await this.#receiptDetailRepo.update(id, receiptDetail)

    if (updatedReceiptDetail)
      return ReceiptDetailMapper.toViewReceiptDetailDTO(updatedReceiptDetail)
    return null
  }
}
