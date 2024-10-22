import { Order } from '../../domain/entities/Order'
import { ViewOrderDTO } from '../dtos/OrderDTO'

export class OrderMapper {
  static toViewOrderDTO(order: Order): ViewOrderDTO {
    return order
  }
}
