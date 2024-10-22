import { Request, Response } from 'express'
import { CreateProductInventoryUseCase } from '../../application/use-cases/productInventory/CreateProductInventoryUseCase'
import { DeleteProductInventoryUseCase } from '../../application/use-cases/productInventory/DeleteProductInventoryUseCase'
import { FindAllProductInventoryUseCase } from '../../application/use-cases/productInventory/FindAllProductInventoryUseCase'
import { FindProductInventoryByIdUseCase } from '../../application/use-cases/productInventory/FindProductInventoryByIdUseCase'
import { UpdateProductInventoryUseCase } from '../../application/use-cases/productInventory/UpdateProductInventoryUseCase'
import { CreateProductInventoryDTO, UpdateProductInventoryDTO } from '../../application/dtos/ProductInventoryDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductInventoryController extends BaseController {
  readonly #createProductInventoryUseCase: CreateProductInventoryUseCase
  readonly #updateProductInventoryUseCase: UpdateProductInventoryUseCase
  readonly #findProductInventoryByIdUseCase: FindProductInventoryByIdUseCase
  readonly #findAllProductInventoryUseCase: FindAllProductInventoryUseCase
  readonly #deleteProductInventoryUseCase: DeleteProductInventoryUseCase

  constructor(
    createProductInventoryUseCase: CreateProductInventoryUseCase,
    updateProductInventoryUseCase: UpdateProductInventoryUseCase,
    findProductInventoryByIdUseCase: FindProductInventoryByIdUseCase,
    findAllProductInventoryUseCase: FindAllProductInventoryUseCase,
    deleteProductInventoryUseCase: DeleteProductInventoryUseCase
  ) {
    super()
    this.#createProductInventoryUseCase = createProductInventoryUseCase
    this.#updateProductInventoryUseCase = updateProductInventoryUseCase
    this.#findProductInventoryByIdUseCase = findProductInventoryByIdUseCase
    this.#findAllProductInventoryUseCase = findAllProductInventoryUseCase
    this.#deleteProductInventoryUseCase = deleteProductInventoryUseCase
  }

  async create(req: Request, res: Response) {
    const createProductInventoryDTO: CreateProductInventoryDTO = req.body

    try {
      const createdProductInventory = await this.#createProductInventoryUseCase.execute(createProductInventoryDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdProductInventory)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const productInventoryId = req.params.id
    const updateProductInventoryDTO: UpdateProductInventoryDTO = req.body

    try {
      const updatedProductInventory = await this.#updateProductInventoryUseCase.execute(productInventoryId, updateProductInventoryDTO)
      return res.status(HTTP_STATUS.OK).json(updatedProductInventory)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const productInventoryId = req.params.id

    try {
      const productInventory = await this.#findProductInventoryByIdUseCase.execute(productInventoryId)
      if (!productInventory) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productInventory)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const productInventory = await this.#findAllProductInventoryUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productInventory)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const productInventoryId = req.params.id

    try {
      await this.#deleteProductInventoryUseCase.execute(productInventoryId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
