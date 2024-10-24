import { ReceiptDetail } from '../../domain/entities/ReceiptDetail'
import { ReceiptDetailDtoView } from '../dtos/ReceiptDetailDto'

export class ReceiptDetailMapper {
  static toReceiptDetailDtoView(receiptDetail: ReceiptDetail): ReceiptDetailDtoView {
    return receiptDetail
  }
}
