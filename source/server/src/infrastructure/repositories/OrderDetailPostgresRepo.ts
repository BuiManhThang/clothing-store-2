import { IOrderDetailRepo } from '../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetail } from '../../domain/entities/OrderDetail'
import { BasePostgresRepo } from './BasePostgresRepo'

export class OrderDetailPostgresRepo
  extends BasePostgresRepo<OrderDetail>
  implements IOrderDetailRepo
{
  constructor() {
    super('orderDetails')
  }
}
