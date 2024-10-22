import { Order } from '../../../domain/entities/Order'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateOrderDTO, ViewOrderDTO } from '../../dtos/OrderDTO'
import { IOrderRepo } from '../../../domain/interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'

export class UpdateOrderUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderRepo: IOrderRepo) {
    this.#orderRepo = orderRepo
  }

  async execute(id: string, updateorderDTO: UpdateOrderDTO): Promise<ViewOrderDTO | null> {
    const oldOrder = await this.#orderRepo.findById(id)
    if (!oldOrder) throw new NotFoundError('')

    const order: Order = {
      id: oldOrder.id,
      orderDate: updateorderDTO.orderDate,
      totalMoney: updateorderDTO.totalMoney,
      totalProduct: updateorderDTO.totalProduct,
      couponPercent: updateorderDTO.couponPercent,
      finalTotalMoney: updateorderDTO.finalTotalMoney,
      createdUserId: updateorderDTO.createdUserId,
      couponId: updateorderDTO.couponId,
      district: updateorderDTO.district,
      code: updateorderDTO.code,
      address: updateorderDTO.address,
      email: updateorderDTO.email,
      phoneNumber: updateorderDTO.phoneNumber,
      status: updateorderDTO.status,
      description: updateorderDTO.description,
      city: updateorderDTO.city,
      createdAt: oldOrder.createdAt,
      createdBy: oldOrder.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedOrder = await this.#orderRepo.update(id, order)

    if (updatedOrder) return OrderMapper.toViewOrderDTO(updatedOrder)
    return null
  }
}
