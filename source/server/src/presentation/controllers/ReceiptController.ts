import { Request, Response } from 'express'
import { CreateReceiptUseCase } from '../../application/use-cases/receipt/CreateReceiptUseCase'
import { DeleteReceiptUseCase } from '../../application/use-cases/receipt/DeleteReceiptUseCase'
import { FindAllReceiptsUseCase } from '../../application/use-cases/receipt/FindAllReceiptsUseCase'
import { FindReceiptByIdUseCase } from '../../application/use-cases/receipt/FindReceiptByIdUseCase'
import { UpdateReceiptUseCase } from '../../application/use-cases/receipt/UpdateReceiptUseCase'
import { CreateReceiptDTO, UpdateReceiptDTO } from '../../application/dtos/ReceiptDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ReceiptController extends BaseController {
  readonly #createReceiptUseCase: CreateReceiptUseCase
  readonly #updateReceiptUseCase: UpdateReceiptUseCase
  readonly #findReceiptByIdUseCase: FindReceiptByIdUseCase
  readonly #findAllReceiptsUseCase: FindAllReceiptsUseCase
  readonly #deleteReceiptUseCase: DeleteReceiptUseCase

  constructor(
    createReceiptUseCase: CreateReceiptUseCase,
    updateReceiptUseCase: UpdateReceiptUseCase,
    findReceiptByIdUseCase: FindReceiptByIdUseCase,
    findAllReceiptsUseCase: FindAllReceiptsUseCase,
    deleteReceiptUseCase: DeleteReceiptUseCase
  ) {
    super()
    this.#createReceiptUseCase = createReceiptUseCase
    this.#updateReceiptUseCase = updateReceiptUseCase
    this.#findReceiptByIdUseCase = findReceiptByIdUseCase
    this.#findAllReceiptsUseCase = findAllReceiptsUseCase
    this.#deleteReceiptUseCase = deleteReceiptUseCase
  }

  async create(req: Request, res: Response) {
    const createReceiptDTO: CreateReceiptDTO = req.body

    try {
      const createdReceipt = await this.#createReceiptUseCase.execute(createReceiptDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdReceipt)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const receiptId = req.params.id
    const updateReceiptDTO: UpdateReceiptDTO = req.body

    try {
      const updatedReceipt = await this.#updateReceiptUseCase.execute(receiptId, updateReceiptDTO)
      return res.status(HTTP_STATUS.OK).json(updatedReceipt)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const receiptId = req.params.id

    try {
      const receipt = await this.#findReceiptByIdUseCase.execute(receiptId)
      if (!receipt) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(receipt)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const receipts = await this.#findAllReceiptsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(receipts)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const receiptId = req.params.id

    try {
      await this.#deleteReceiptUseCase.execute(receiptId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
