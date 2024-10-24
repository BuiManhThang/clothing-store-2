import { Request, Response, NextFunction } from 'express'
import { CreateOrderUseCase } from '../../application/use-cases/order/CreateOrderUseCase'
import { DeleteOrderUseCase } from '../../application/use-cases/order/DeleteOrderUseCase'
import { FindAllOrdersUseCase } from '../../application/use-cases/order/FindAllOrdersUseCase'
import { GetOrderPaginationUseCase } from '../../application/use-cases/order/GetOrderPaginationUseCase'
import { FindOrderByIdUseCase } from '../../application/use-cases/order/FindOrderByIdUseCase'
import { UpdateOrderUseCase } from '../../application/use-cases/order/UpdateOrderUseCase'
import { OrderDtoCreate, OrderDtoUpdate } from '../../application/dtos/OrderDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class OrderController extends BaseController {
  readonly #createOrderUseCase: CreateOrderUseCase
  readonly #updateOrderUseCase: UpdateOrderUseCase
  readonly #findOrderByIdUseCase: FindOrderByIdUseCase
  readonly #findAllOrdersUseCase: FindAllOrdersUseCase
  readonly #getPaginationOrderUseCase: GetOrderPaginationUseCase
  readonly #deleteOrderUseCase: DeleteOrderUseCase

  constructor(
    createOrderUseCase: CreateOrderUseCase,
    updateOrderUseCase: UpdateOrderUseCase,
    findOrderByIdUseCase: FindOrderByIdUseCase,
    findAllOrdersUseCase: FindAllOrdersUseCase,
    getPaginationOrderUseCase: GetOrderPaginationUseCase,
    deleteOrderUseCase: DeleteOrderUseCase
  ) {
    super()
    this.#createOrderUseCase = createOrderUseCase
    this.#updateOrderUseCase = updateOrderUseCase
    this.#findOrderByIdUseCase = findOrderByIdUseCase
    this.#findAllOrdersUseCase = findAllOrdersUseCase
    this.#getPaginationOrderUseCase = getPaginationOrderUseCase
    this.#deleteOrderUseCase = deleteOrderUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createOrderDto: OrderDtoCreate = req.body

    try {
      const createdOrder = await this.#createOrderUseCase.execute(req.userContextService, createOrderDto)
      return res.status(HTTP_STATUS.CREATED).json(createdOrder)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id
    const updateOrderDto: OrderDtoUpdate = req.body

    try {
      const updatedOrder = await this.#updateOrderUseCase.execute(req.userContextService, orderId, updateOrderDto)
      return res.status(HTTP_STATUS.OK).json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id

    try {
      const order = await this.#findOrderByIdUseCase.execute(orderId)
      if (!order) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(order)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this.#findAllOrdersUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(orders)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationOrderUseCase.execute(
        pageSize,
        pageIndex,
        req.query.sort?.toString(),
        req.query.sortDirection?.toString(),
      )

      return res.status(HTTP_STATUS.OK).json(paginationResult)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id

    try {
      await this.#deleteOrderUseCase.execute(orderId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
