import { Request, Response, NextFunction } from 'express'
import { CreateOrderDetailUseCase } from '../../application/use-cases/orderDetail/CreateOrderDetailUseCase'
import { DeleteOrderDetailUseCase } from '../../application/use-cases/orderDetail/DeleteOrderDetailUseCase'
import { FindAllOrderDetailsUseCase } from '../../application/use-cases/orderDetail/FindAllOrderDetailsUseCase'
import { GetOrderDetailPaginationUseCase } from '../../application/use-cases/orderDetail/GetOrderDetailPaginationUseCase'
import { FindOrderDetailByIdUseCase } from '../../application/use-cases/orderDetail/FindOrderDetailByIdUseCase'
import { UpdateOrderDetailUseCase } from '../../application/use-cases/orderDetail/UpdateOrderDetailUseCase'
import { OrderDetailDtoCreate, OrderDetailDtoUpdate } from '../../application/dtos/OrderDetailDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class OrderDetailController extends BaseController {
  readonly #createOrderDetailUseCase: CreateOrderDetailUseCase
  readonly #updateOrderDetailUseCase: UpdateOrderDetailUseCase
  readonly #findOrderDetailByIdUseCase: FindOrderDetailByIdUseCase
  readonly #findAllOrderDetailsUseCase: FindAllOrderDetailsUseCase
  readonly #getPaginationOrderDetailUseCase: GetOrderDetailPaginationUseCase
  readonly #deleteOrderDetailUseCase: DeleteOrderDetailUseCase

  constructor(
    createOrderDetailUseCase: CreateOrderDetailUseCase,
    updateOrderDetailUseCase: UpdateOrderDetailUseCase,
    findOrderDetailByIdUseCase: FindOrderDetailByIdUseCase,
    findAllOrderDetailsUseCase: FindAllOrderDetailsUseCase,
    getPaginationOrderDetailUseCase: GetOrderDetailPaginationUseCase,
    deleteOrderDetailUseCase: DeleteOrderDetailUseCase
  ) {
    super()
    this.#createOrderDetailUseCase = createOrderDetailUseCase
    this.#updateOrderDetailUseCase = updateOrderDetailUseCase
    this.#findOrderDetailByIdUseCase = findOrderDetailByIdUseCase
    this.#findAllOrderDetailsUseCase = findAllOrderDetailsUseCase
    this.#getPaginationOrderDetailUseCase = getPaginationOrderDetailUseCase
    this.#deleteOrderDetailUseCase = deleteOrderDetailUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createOrderDetailDto: OrderDetailDtoCreate = req.body

    try {
      const createdOrderDetail = await this.#createOrderDetailUseCase.execute(req.userContextService, createOrderDetailDto)
      return res.status(HTTP_STATUS.CREATED).json(createdOrderDetail)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const orderDetailId = req.params.id
    const updateOrderDetailDto: OrderDetailDtoUpdate = req.body

    try {
      const updatedOrderDetail = await this.#updateOrderDetailUseCase.execute(req.userContextService, orderDetailId, updateOrderDetailDto)
      return res.status(HTTP_STATUS.OK).json(updatedOrderDetail)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const orderDetailId = req.params.id

    try {
      const orderDetail = await this.#findOrderDetailByIdUseCase.execute(orderDetailId)
      if (!orderDetail) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(orderDetail)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const orderDetails = await this.#findAllOrderDetailsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(orderDetails)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationOrderDetailUseCase.execute(
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
    const orderDetailId = req.params.id

    try {
      await this.#deleteOrderDetailUseCase.execute(orderDetailId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
