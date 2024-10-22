import { IOrderRepo } from '../../domain/interfaces/repositories/IOrderRepo'
import { Order } from '../../domain/entities/Order'
import { BasePostgresRepo } from './BasePostgresRepo'

export class OrderPostgresRepo extends BasePostgresRepo<Order> implements IOrderRepo {
  constructor() {
    super('orders')
  }
}
