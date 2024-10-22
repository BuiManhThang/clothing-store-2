import { IReceiptDetailRepo } from '../../application/interfaces/repositories/IReceiptDetailRepo'
import { ReceiptDetail } from '../../domain/entities/ReceiptDetail'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ReceiptDetailPostgresRepo extends BasePostgresRepo<ReceiptDetail> implements IReceiptDetailRepo {
  constructor() {
    super('receiptDetails')
  }
}
