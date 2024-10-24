import { Request, Response, NextFunction } from 'express'
import { CreateProductSizeUseCase } from '../../application/use-cases/productSize/CreateProductSizeUseCase'
import { DeleteProductSizeUseCase } from '../../application/use-cases/productSize/DeleteProductSizeUseCase'
import { FindAllProductSizesUseCase } from '../../application/use-cases/productSize/FindAllProductSizesUseCase'
import { GetProductSizePaginationUseCase } from '../../application/use-cases/productSize/GetProductSizePaginationUseCase'
import { FindProductSizeByIdUseCase } from '../../application/use-cases/productSize/FindProductSizeByIdUseCase'
import { UpdateProductSizeUseCase } from '../../application/use-cases/productSize/UpdateProductSizeUseCase'
import { ProductSizeDtoCreate, ProductSizeDtoUpdate } from '../../application/dtos/ProductSizeDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductSizeController extends BaseController {
  readonly #createProductSizeUseCase: CreateProductSizeUseCase
  readonly #updateProductSizeUseCase: UpdateProductSizeUseCase
  readonly #findProductSizeByIdUseCase: FindProductSizeByIdUseCase
  readonly #findAllProductSizesUseCase: FindAllProductSizesUseCase
  readonly #getPaginationProductSizeUseCase: GetProductSizePaginationUseCase
  readonly #deleteProductSizeUseCase: DeleteProductSizeUseCase

  constructor(
    createProductSizeUseCase: CreateProductSizeUseCase,
    updateProductSizeUseCase: UpdateProductSizeUseCase,
    findProductSizeByIdUseCase: FindProductSizeByIdUseCase,
    findAllProductSizesUseCase: FindAllProductSizesUseCase,
    getPaginationProductSizeUseCase: GetProductSizePaginationUseCase,
    deleteProductSizeUseCase: DeleteProductSizeUseCase
  ) {
    super()
    this.#createProductSizeUseCase = createProductSizeUseCase
    this.#updateProductSizeUseCase = updateProductSizeUseCase
    this.#findProductSizeByIdUseCase = findProductSizeByIdUseCase
    this.#findAllProductSizesUseCase = findAllProductSizesUseCase
    this.#getPaginationProductSizeUseCase = getPaginationProductSizeUseCase
    this.#deleteProductSizeUseCase = deleteProductSizeUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createProductSizeDto: ProductSizeDtoCreate = req.body

    try {
      const createdProductSize = await this.#createProductSizeUseCase.execute(req.userContextService, createProductSizeDto)
      return res.status(HTTP_STATUS.CREATED).json(createdProductSize)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const productSizeId = req.params.id
    const updateProductSizeDto: ProductSizeDtoUpdate = req.body

    try {
      const updatedProductSize = await this.#updateProductSizeUseCase.execute(req.userContextService, productSizeId, updateProductSizeDto)
      return res.status(HTTP_STATUS.OK).json(updatedProductSize)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const productSizeId = req.params.id

    try {
      const productSize = await this.#findProductSizeByIdUseCase.execute(productSizeId)
      if (!productSize) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productSize)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const productSizes = await this.#findAllProductSizesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productSizes)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationProductSizeUseCase.execute(
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
    const productSizeId = req.params.id

    try {
      await this.#deleteProductSizeUseCase.execute(productSizeId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
