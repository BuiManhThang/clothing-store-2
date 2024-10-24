import { Request, Response, NextFunction } from 'express'
import { CreateReceiptUseCase } from '../../application/use-cases/receipt/CreateReceiptUseCase'
import { DeleteReceiptUseCase } from '../../application/use-cases/receipt/DeleteReceiptUseCase'
import { FindAllReceiptsUseCase } from '../../application/use-cases/receipt/FindAllReceiptsUseCase'
import { GetReceiptPaginationUseCase } from '../../application/use-cases/receipt/GetReceiptPaginationUseCase'
import { FindReceiptByIdUseCase } from '../../application/use-cases/receipt/FindReceiptByIdUseCase'
import { UpdateReceiptUseCase } from '../../application/use-cases/receipt/UpdateReceiptUseCase'
import { ReceiptDtoCreate, ReceiptDtoUpdate } from '../../application/dtos/ReceiptDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ReceiptController extends BaseController {
  readonly #createReceiptUseCase: CreateReceiptUseCase
  readonly #updateReceiptUseCase: UpdateReceiptUseCase
  readonly #findReceiptByIdUseCase: FindReceiptByIdUseCase
  readonly #findAllReceiptsUseCase: FindAllReceiptsUseCase
  readonly #getPaginationReceiptUseCase: GetReceiptPaginationUseCase
  readonly #deleteReceiptUseCase: DeleteReceiptUseCase

  constructor(
    createReceiptUseCase: CreateReceiptUseCase,
    updateReceiptUseCase: UpdateReceiptUseCase,
    findReceiptByIdUseCase: FindReceiptByIdUseCase,
    findAllReceiptsUseCase: FindAllReceiptsUseCase,
    getPaginationReceiptUseCase: GetReceiptPaginationUseCase,
    deleteReceiptUseCase: DeleteReceiptUseCase
  ) {
    super()
    this.#createReceiptUseCase = createReceiptUseCase
    this.#updateReceiptUseCase = updateReceiptUseCase
    this.#findReceiptByIdUseCase = findReceiptByIdUseCase
    this.#findAllReceiptsUseCase = findAllReceiptsUseCase
    this.#getPaginationReceiptUseCase = getPaginationReceiptUseCase
    this.#deleteReceiptUseCase = deleteReceiptUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createReceiptDto: ReceiptDtoCreate = req.body

    try {
      const createdReceipt = await this.#createReceiptUseCase.execute(req.userContextService, createReceiptDto)
      return res.status(HTTP_STATUS.CREATED).json(createdReceipt)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const receiptId = req.params.id
    const updateReceiptDto: ReceiptDtoUpdate = req.body

    try {
      const updatedReceipt = await this.#updateReceiptUseCase.execute(req.userContextService, receiptId, updateReceiptDto)
      return res.status(HTTP_STATUS.OK).json(updatedReceipt)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const receiptId = req.params.id

    try {
      const receipt = await this.#findReceiptByIdUseCase.execute(receiptId)
      if (!receipt) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(receipt)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const receipts = await this.#findAllReceiptsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(receipts)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationReceiptUseCase.execute(
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
    const receiptId = req.params.id

    try {
      await this.#deleteReceiptUseCase.execute(receiptId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
