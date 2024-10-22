import { Request, Response } from 'express'
import { CreateOrderUseCase } from '../../application/use-cases/order/CreateOrderUseCase'
import { DeleteOrderUseCase } from '../../application/use-cases/order/DeleteOrderUseCase'
import { FindAllOrdersUseCase } from '../../application/use-cases/order/FindAllOrdersUseCase'
import { FindOrderByIdUseCase } from '../../application/use-cases/order/FindOrderByIdUseCase'
import { UpdateOrderUseCase } from '../../application/use-cases/order/UpdateOrderUseCase'
import { CreateOrderDTO, UpdateOrderDTO } from '../../application/dtos/OrderDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class OrderController extends BaseController {
  readonly #createOrderUseCase: CreateOrderUseCase
  readonly #updateOrderUseCase: UpdateOrderUseCase
  readonly #findOrderByIdUseCase: FindOrderByIdUseCase
  readonly #findAllOrdersUseCase: FindAllOrdersUseCase
  readonly #deleteOrderUseCase: DeleteOrderUseCase

  constructor(
    createOrderUseCase: CreateOrderUseCase,
    updateOrderUseCase: UpdateOrderUseCase,
    findOrderByIdUseCase: FindOrderByIdUseCase,
    findAllOrdersUseCase: FindAllOrdersUseCase,
    deleteOrderUseCase: DeleteOrderUseCase
  ) {
    super()
    this.#createOrderUseCase = createOrderUseCase
    this.#updateOrderUseCase = updateOrderUseCase
    this.#findOrderByIdUseCase = findOrderByIdUseCase
    this.#findAllOrdersUseCase = findAllOrdersUseCase
    this.#deleteOrderUseCase = deleteOrderUseCase
  }

  async create(req: Request, res: Response) {
    const createOrderDTO: CreateOrderDTO = req.body

    try {
      const createdOrder = await this.#createOrderUseCase.execute(createOrderDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdOrder)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const orderId = req.params.id
    const updateOrderDTO: UpdateOrderDTO = req.body

    try {
      const updatedOrder = await this.#updateOrderUseCase.execute(orderId, updateOrderDTO)
      return res.status(HTTP_STATUS.OK).json(updatedOrder)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const orderId = req.params.id

    try {
      const order = await this.#findOrderByIdUseCase.execute(orderId)
      if (!order) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(order)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const orders = await this.#findAllOrdersUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(orders)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const orderId = req.params.id

    try {
      await this.#deleteOrderUseCase.execute(orderId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
