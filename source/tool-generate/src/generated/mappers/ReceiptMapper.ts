import { Receipt } from '../../domain/entities/Receipt'
import { ReceiptDtoView } from '../dtos/ReceiptDto'

export class ReceiptMapper {
  static toReceiptDtoView(receipt: Receipt): ReceiptDtoView {
    return receipt
  }
}
