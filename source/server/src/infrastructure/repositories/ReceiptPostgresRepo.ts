import { IReceiptRepo } from '../../domain/interfaces/repositories/IReceiptRepo'
import { Receipt } from '../../domain/entities/Receipt'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ReceiptPostgresRepo extends BasePostgresRepo<Receipt> implements IReceiptRepo {
  constructor() {
    super('receipts')
  }
}
