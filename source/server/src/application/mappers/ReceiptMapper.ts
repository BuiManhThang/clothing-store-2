import { Receipt } from '../../domain/entities/Receipt'
import { ViewReceiptDTO } from '../dtos/ReceiptDTO'

export class ReceiptMapper {
  static toViewReceiptDTO(receipt: Receipt): ViewReceiptDTO {
    return receipt
  }
}
