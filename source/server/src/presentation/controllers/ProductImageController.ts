import { Request, Response, NextFunction } from 'express'
import { CreateProductImageUseCase } from '../../application/use-cases/productImage/CreateProductImageUseCase'
import { DeleteProductImageUseCase } from '../../application/use-cases/productImage/DeleteProductImageUseCase'
import { FindAllProductImagesUseCase } from '../../application/use-cases/productImage/FindAllProductImagesUseCase'
import { GetProductImagePaginationUseCase } from '../../application/use-cases/productImage/GetProductImagePaginationUseCase'
import { FindProductImageByIdUseCase } from '../../application/use-cases/productImage/FindProductImageByIdUseCase'
import { UpdateProductImageUseCase } from '../../application/use-cases/productImage/UpdateProductImageUseCase'
import { ProductImageDtoCreate, ProductImageDtoUpdate } from '../../application/dtos/ProductImageDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductImageController extends BaseController {
  readonly #createProductImageUseCase: CreateProductImageUseCase
  readonly #updateProductImageUseCase: UpdateProductImageUseCase
  readonly #findProductImageByIdUseCase: FindProductImageByIdUseCase
  readonly #findAllProductImagesUseCase: FindAllProductImagesUseCase
  readonly #getPaginationProductImageUseCase: GetProductImagePaginationUseCase
  readonly #deleteProductImageUseCase: DeleteProductImageUseCase

  constructor(
    createProductImageUseCase: CreateProductImageUseCase,
    updateProductImageUseCase: UpdateProductImageUseCase,
    findProductImageByIdUseCase: FindProductImageByIdUseCase,
    findAllProductImagesUseCase: FindAllProductImagesUseCase,
    getPaginationProductImageUseCase: GetProductImagePaginationUseCase,
    deleteProductImageUseCase: DeleteProductImageUseCase
  ) {
    super()
    this.#createProductImageUseCase = createProductImageUseCase
    this.#updateProductImageUseCase = updateProductImageUseCase
    this.#findProductImageByIdUseCase = findProductImageByIdUseCase
    this.#findAllProductImagesUseCase = findAllProductImagesUseCase
    this.#getPaginationProductImageUseCase = getPaginationProductImageUseCase
    this.#deleteProductImageUseCase = deleteProductImageUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createProductImageDto: ProductImageDtoCreate = req.body

    try {
      const createdProductImage = await this.#createProductImageUseCase.execute(req.userContextService, createProductImageDto)
      return res.status(HTTP_STATUS.CREATED).json(createdProductImage)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const productImageId = req.params.id
    const updateProductImageDto: ProductImageDtoUpdate = req.body

    try {
      const updatedProductImage = await this.#updateProductImageUseCase.execute(req.userContextService, productImageId, updateProductImageDto)
      return res.status(HTTP_STATUS.OK).json(updatedProductImage)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const productImageId = req.params.id

    try {
      const productImage = await this.#findProductImageByIdUseCase.execute(productImageId)
      if (!productImage) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productImage)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const productImages = await this.#findAllProductImagesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productImages)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationProductImageUseCase.execute(
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
    const productImageId = req.params.id

    try {
      await this.#deleteProductImageUseCase.execute(productImageId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
