import { Request, Response } from 'express'
import { CreateProductInventorUseCase } from '../../application/use-cases/productInventor/CreateProductInventorUseCase'
import { DeleteProductInventorUseCase } from '../../application/use-cases/productInventor/DeleteProductInventorUseCase'
import { FindAllProductInventorsUseCase } from '../../application/use-cases/productInventor/FindAllProductInventorsUseCase'
import { FindProductInventorByIdUseCase } from '../../application/use-cases/productInventor/FindProductInventorByIdUseCase'
import { UpdateProductInventorUseCase } from '../../application/use-cases/productInventor/UpdateProductInventorUseCase'
import { CreateProductInventorDTO, UpdateProductInventorDTO } from '../../application/dtos/ProductInventorDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductInventorController extends BaseController {
  readonly #createProductInventorUseCase: CreateProductInventorUseCase
  readonly #updateProductInventorUseCase: UpdateProductInventorUseCase
  readonly #findProductInventorByIdUseCase: FindProductInventorByIdUseCase
  readonly #findAllProductInventorsUseCase: FindAllProductInventorsUseCase
  readonly #deleteProductInventorUseCase: DeleteProductInventorUseCase

  constructor(
    createProductInventorUseCase: CreateProductInventorUseCase,
    updateProductInventorUseCase: UpdateProductInventorUseCase,
    findProductInventorByIdUseCase: FindProductInventorByIdUseCase,
    findAllProductInventorsUseCase: FindAllProductInventorsUseCase,
    deleteProductInventorUseCase: DeleteProductInventorUseCase
  ) {
    super()
    this.#createProductInventorUseCase = createProductInventorUseCase
    this.#updateProductInventorUseCase = updateProductInventorUseCase
    this.#findProductInventorByIdUseCase = findProductInventorByIdUseCase
    this.#findAllProductInventorsUseCase = findAllProductInventorsUseCase
    this.#deleteProductInventorUseCase = deleteProductInventorUseCase
  }

  async create(req: Request, res: Response) {
    const createProductInventorDTO: CreateProductInventorDTO = req.body

    try {
      const createdProductInventor = await this.#createProductInventorUseCase.execute(createProductInventorDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdProductInventor)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const productInventorId = req.params.id
    const updateProductInventorDTO: UpdateProductInventorDTO = req.body

    try {
      const updatedProductInventor = await this.#updateProductInventorUseCase.execute(productInventorId, updateProductInventorDTO)
      return res.status(HTTP_STATUS.OK).json(updatedProductInventor)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const productInventorId = req.params.id

    try {
      const productInventor = await this.#findProductInventorByIdUseCase.execute(productInventorId)
      if (!productInventor) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productInventor)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const productInventors = await this.#findAllProductInventorsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productInventors)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const productInventorId = req.params.id

    try {
      await this.#deleteProductInventorUseCase.execute(productInventorId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
