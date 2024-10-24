import { Request, Response, NextFunction } from 'express'
import { CreateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/CreateReceiptDetailUseCase'
import { DeleteReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/DeleteReceiptDetailUseCase'
import { FindAllReceiptDetailsUseCase } from '../../application/use-cases/receiptDetail/FindAllReceiptDetailsUseCase'
import { GetReceiptDetailPaginationUseCase } from '../../application/use-cases/receiptDetail/GetReceiptDetailPaginationUseCase'
import { FindReceiptDetailByIdUseCase } from '../../application/use-cases/receiptDetail/FindReceiptDetailByIdUseCase'
import { UpdateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/UpdateReceiptDetailUseCase'
import { ReceiptDetailDtoCreate, ReceiptDetailDtoUpdate } from '../../application/dtos/ReceiptDetailDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ReceiptDetailController extends BaseController {
  readonly #createReceiptDetailUseCase: CreateReceiptDetailUseCase
  readonly #updateReceiptDetailUseCase: UpdateReceiptDetailUseCase
  readonly #findReceiptDetailByIdUseCase: FindReceiptDetailByIdUseCase
  readonly #findAllReceiptDetailsUseCase: FindAllReceiptDetailsUseCase
  readonly #getPaginationReceiptDetailUseCase: GetReceiptDetailPaginationUseCase
  readonly #deleteReceiptDetailUseCase: DeleteReceiptDetailUseCase

  constructor(
    createReceiptDetailUseCase: CreateReceiptDetailUseCase,
    updateReceiptDetailUseCase: UpdateReceiptDetailUseCase,
    findReceiptDetailByIdUseCase: FindReceiptDetailByIdUseCase,
    findAllReceiptDetailsUseCase: FindAllReceiptDetailsUseCase,
    getPaginationReceiptDetailUseCase: GetReceiptDetailPaginationUseCase,
    deleteReceiptDetailUseCase: DeleteReceiptDetailUseCase
  ) {
    super()
    this.#createReceiptDetailUseCase = createReceiptDetailUseCase
    this.#updateReceiptDetailUseCase = updateReceiptDetailUseCase
    this.#findReceiptDetailByIdUseCase = findReceiptDetailByIdUseCase
    this.#findAllReceiptDetailsUseCase = findAllReceiptDetailsUseCase
    this.#getPaginationReceiptDetailUseCase = getPaginationReceiptDetailUseCase
    this.#deleteReceiptDetailUseCase = deleteReceiptDetailUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createReceiptDetailDto: ReceiptDetailDtoCreate = req.body

    try {
      const createdReceiptDetail = await this.#createReceiptDetailUseCase.execute(req.userContextService, createReceiptDetailDto)
      return res.status(HTTP_STATUS.CREATED).json(createdReceiptDetail)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const receiptDetailId = req.params.id
    const updateReceiptDetailDto: ReceiptDetailDtoUpdate = req.body

    try {
      const updatedReceiptDetail = await this.#updateReceiptDetailUseCase.execute(req.userContextService, receiptDetailId, updateReceiptDetailDto)
      return res.status(HTTP_STATUS.OK).json(updatedReceiptDetail)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const receiptDetailId = req.params.id

    try {
      const receiptDetail = await this.#findReceiptDetailByIdUseCase.execute(receiptDetailId)
      if (!receiptDetail) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(receiptDetail)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const receiptDetails = await this.#findAllReceiptDetailsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(receiptDetails)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationReceiptDetailUseCase.execute(
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
    const receiptDetailId = req.params.id

    try {
      await this.#deleteReceiptDetailUseCase.execute(receiptDetailId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
