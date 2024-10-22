import { Request, Response } from 'express'
import { CreateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/CreateReceiptDetailUseCase'
import { DeleteReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/DeleteReceiptDetailUseCase'
import { FindAllReceiptDetailsUseCase } from '../../application/use-cases/receiptDetail/FindAllReceiptDetailsUseCase'
import { FindReceiptDetailByIdUseCase } from '../../application/use-cases/receiptDetail/FindReceiptDetailByIdUseCase'
import { UpdateReceiptDetailUseCase } from '../../application/use-cases/receiptDetail/UpdateReceiptDetailUseCase'
import { CreateReceiptDetailDTO, UpdateReceiptDetailDTO } from '../../application/dtos/ReceiptDetailDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ReceiptDetailController extends BaseController {
  readonly #createReceiptDetailUseCase: CreateReceiptDetailUseCase
  readonly #updateReceiptDetailUseCase: UpdateReceiptDetailUseCase
  readonly #findReceiptDetailByIdUseCase: FindReceiptDetailByIdUseCase
  readonly #findAllReceiptDetailsUseCase: FindAllReceiptDetailsUseCase
  readonly #deleteReceiptDetailUseCase: DeleteReceiptDetailUseCase

  constructor(
    createReceiptDetailUseCase: CreateReceiptDetailUseCase,
    updateReceiptDetailUseCase: UpdateReceiptDetailUseCase,
    findReceiptDetailByIdUseCase: FindReceiptDetailByIdUseCase,
    findAllReceiptDetailsUseCase: FindAllReceiptDetailsUseCase,
    deleteReceiptDetailUseCase: DeleteReceiptDetailUseCase
  ) {
    super()
    this.#createReceiptDetailUseCase = createReceiptDetailUseCase
    this.#updateReceiptDetailUseCase = updateReceiptDetailUseCase
    this.#findReceiptDetailByIdUseCase = findReceiptDetailByIdUseCase
    this.#findAllReceiptDetailsUseCase = findAllReceiptDetailsUseCase
    this.#deleteReceiptDetailUseCase = deleteReceiptDetailUseCase
  }

  async create(req: Request, res: Response) {
    const createReceiptDetailDTO: CreateReceiptDetailDTO = req.body

    try {
      const createdReceiptDetail = await this.#createReceiptDetailUseCase.execute(createReceiptDetailDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdReceiptDetail)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const receiptDetailId = req.params.id
    const updateReceiptDetailDTO: UpdateReceiptDetailDTO = req.body

    try {
      const updatedReceiptDetail = await this.#updateReceiptDetailUseCase.execute(receiptDetailId, updateReceiptDetailDTO)
      return res.status(HTTP_STATUS.OK).json(updatedReceiptDetail)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const receiptDetailId = req.params.id

    try {
      const receiptDetail = await this.#findReceiptDetailByIdUseCase.execute(receiptDetailId)
      if (!receiptDetail) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(receiptDetail)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const receiptDetails = await this.#findAllReceiptDetailsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(receiptDetails)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const receiptDetailId = req.params.id

    try {
      await this.#deleteReceiptDetailUseCase.execute(receiptDetailId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
