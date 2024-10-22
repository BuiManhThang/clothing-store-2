import { Request, Response } from 'express'
import { CreateProductImageUseCase } from '../../application/use-cases/productImage/CreateProductImageUseCase'
import { DeleteProductImageUseCase } from '../../application/use-cases/productImage/DeleteProductImageUseCase'
import { FindAllProductImagesUseCase } from '../../application/use-cases/productImage/FindAllProductImagesUseCase'
import { FindProductImageByIdUseCase } from '../../application/use-cases/productImage/FindProductImageByIdUseCase'
import { UpdateProductImageUseCase } from '../../application/use-cases/productImage/UpdateProductImageUseCase'
import { CreateProductImageDTO, UpdateProductImageDTO } from '../../application/dtos/ProductImageDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductImageController extends BaseController {
  readonly #createProductImageUseCase: CreateProductImageUseCase
  readonly #updateProductImageUseCase: UpdateProductImageUseCase
  readonly #findProductImageByIdUseCase: FindProductImageByIdUseCase
  readonly #findAllProductImagesUseCase: FindAllProductImagesUseCase
  readonly #deleteProductImageUseCase: DeleteProductImageUseCase

  constructor(
    createProductImageUseCase: CreateProductImageUseCase,
    updateProductImageUseCase: UpdateProductImageUseCase,
    findProductImageByIdUseCase: FindProductImageByIdUseCase,
    findAllProductImagesUseCase: FindAllProductImagesUseCase,
    deleteProductImageUseCase: DeleteProductImageUseCase
  ) {
    super()
    this.#createProductImageUseCase = createProductImageUseCase
    this.#updateProductImageUseCase = updateProductImageUseCase
    this.#findProductImageByIdUseCase = findProductImageByIdUseCase
    this.#findAllProductImagesUseCase = findAllProductImagesUseCase
    this.#deleteProductImageUseCase = deleteProductImageUseCase
  }

  async create(req: Request, res: Response) {
    const createProductImageDTO: CreateProductImageDTO = req.body

    try {
      const createdProductImage = await this.#createProductImageUseCase.execute(createProductImageDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdProductImage)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const productImageId = req.params.id
    const updateProductImageDTO: UpdateProductImageDTO = req.body

    try {
      const updatedProductImage = await this.#updateProductImageUseCase.execute(productImageId, updateProductImageDTO)
      return res.status(HTTP_STATUS.OK).json(updatedProductImage)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const productImageId = req.params.id

    try {
      const productImage = await this.#findProductImageByIdUseCase.execute(productImageId)
      if (!productImage) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productImage)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const productImages = await this.#findAllProductImagesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productImages)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const productImageId = req.params.id

    try {
      await this.#deleteProductImageUseCase.execute(productImageId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
