import { Request, Response } from 'express'
import { CreateProductSizeUseCase } from '../../application/use-cases/productSize/CreateProductSizeUseCase'
import { DeleteProductSizeUseCase } from '../../application/use-cases/productSize/DeleteProductSizeUseCase'
import { FindAllProductSizesUseCase } from '../../application/use-cases/productSize/FindAllProductSizesUseCase'
import { FindProductSizeByIdUseCase } from '../../application/use-cases/productSize/FindProductSizeByIdUseCase'
import { UpdateProductSizeUseCase } from '../../application/use-cases/productSize/UpdateProductSizeUseCase'
import { CreateProductSizeDTO, UpdateProductSizeDTO } from '../../application/dtos/ProductSizeDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductSizeController extends BaseController {
  readonly #createProductSizeUseCase: CreateProductSizeUseCase
  readonly #updateProductSizeUseCase: UpdateProductSizeUseCase
  readonly #findProductSizeByIdUseCase: FindProductSizeByIdUseCase
  readonly #findAllProductSizesUseCase: FindAllProductSizesUseCase
  readonly #deleteProductSizeUseCase: DeleteProductSizeUseCase

  constructor(
    createProductSizeUseCase: CreateProductSizeUseCase,
    updateProductSizeUseCase: UpdateProductSizeUseCase,
    findProductSizeByIdUseCase: FindProductSizeByIdUseCase,
    findAllProductSizesUseCase: FindAllProductSizesUseCase,
    deleteProductSizeUseCase: DeleteProductSizeUseCase
  ) {
    super()
    this.#createProductSizeUseCase = createProductSizeUseCase
    this.#updateProductSizeUseCase = updateProductSizeUseCase
    this.#findProductSizeByIdUseCase = findProductSizeByIdUseCase
    this.#findAllProductSizesUseCase = findAllProductSizesUseCase
    this.#deleteProductSizeUseCase = deleteProductSizeUseCase
  }

  async create(req: Request, res: Response) {
    const createProductSizeDTO: CreateProductSizeDTO = req.body

    try {
      const createdProductSize = await this.#createProductSizeUseCase.execute(createProductSizeDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdProductSize)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const productSizeId = req.params.id
    const updateProductSizeDTO: UpdateProductSizeDTO = req.body

    try {
      const updatedProductSize = await this.#updateProductSizeUseCase.execute(productSizeId, updateProductSizeDTO)
      return res.status(HTTP_STATUS.OK).json(updatedProductSize)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const productSizeId = req.params.id

    try {
      const productSize = await this.#findProductSizeByIdUseCase.execute(productSizeId)
      if (!productSize) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productSize)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const productSizes = await this.#findAllProductSizesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productSizes)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const productSizeId = req.params.id

    try {
      await this.#deleteProductSizeUseCase.execute(productSizeId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
