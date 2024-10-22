import { ReceiptDetail } from '../../domain/entities/ReceiptDetail'
import { ViewReceiptDetailDTO } from '../dtos/ReceiptDetailDTO'

export class ReceiptDetailMapper {
  static toViewReceiptDetailDTO(receiptDetail: ReceiptDetail): ViewReceiptDetailDTO {
    return receiptDetail
  }
}
