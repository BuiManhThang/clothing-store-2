import { Request, Response } from 'express'
import { CreateOrderDetailUseCase } from '../../application/use-cases/orderDetail/CreateOrderDetailUseCase'
import { DeleteOrderDetailUseCase } from '../../application/use-cases/orderDetail/DeleteOrderDetailUseCase'
import { FindAllOrderDetailsUseCase } from '../../application/use-cases/orderDetail/FindAllOrderDetailsUseCase'
import { FindOrderDetailByIdUseCase } from '../../application/use-cases/orderDetail/FindOrderDetailByIdUseCase'
import { UpdateOrderDetailUseCase } from '../../application/use-cases/orderDetail/UpdateOrderDetailUseCase'
import { CreateOrderDetailDTO, UpdateOrderDetailDTO } from '../../application/dtos/OrderDetailDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class OrderDetailController extends BaseController {
  readonly #createOrderDetailUseCase: CreateOrderDetailUseCase
  readonly #updateOrderDetailUseCase: UpdateOrderDetailUseCase
  readonly #findOrderDetailByIdUseCase: FindOrderDetailByIdUseCase
  readonly #findAllOrderDetailsUseCase: FindAllOrderDetailsUseCase
  readonly #deleteOrderDetailUseCase: DeleteOrderDetailUseCase

  constructor(
    createOrderDetailUseCase: CreateOrderDetailUseCase,
    updateOrderDetailUseCase: UpdateOrderDetailUseCase,
    findOrderDetailByIdUseCase: FindOrderDetailByIdUseCase,
    findAllOrderDetailsUseCase: FindAllOrderDetailsUseCase,
    deleteOrderDetailUseCase: DeleteOrderDetailUseCase
  ) {
    super()
    this.#createOrderDetailUseCase = createOrderDetailUseCase
    this.#updateOrderDetailUseCase = updateOrderDetailUseCase
    this.#findOrderDetailByIdUseCase = findOrderDetailByIdUseCase
    this.#findAllOrderDetailsUseCase = findAllOrderDetailsUseCase
    this.#deleteOrderDetailUseCase = deleteOrderDetailUseCase
  }

  async create(req: Request, res: Response) {
    const createOrderDetailDTO: CreateOrderDetailDTO = req.body

    try {
      const createdOrderDetail = await this.#createOrderDetailUseCase.execute(createOrderDetailDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdOrderDetail)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const orderDetailId = req.params.id
    const updateOrderDetailDTO: UpdateOrderDetailDTO = req.body

    try {
      const updatedOrderDetail = await this.#updateOrderDetailUseCase.execute(orderDetailId, updateOrderDetailDTO)
      return res.status(HTTP_STATUS.OK).json(updatedOrderDetail)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const orderDetailId = req.params.id

    try {
      const orderDetail = await this.#findOrderDetailByIdUseCase.execute(orderDetailId)
      if (!orderDetail) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(orderDetail)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const orderDetails = await this.#findAllOrderDetailsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(orderDetails)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const orderDetailId = req.params.id

    try {
      await this.#deleteOrderDetailUseCase.execute(orderDetailId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
