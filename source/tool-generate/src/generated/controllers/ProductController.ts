import { Request, Response, NextFunction } from 'express'
import { CreateProductUseCase } from '../../application/use-cases/product/CreateProductUseCase'
import { DeleteProductUseCase } from '../../application/use-cases/product/DeleteProductUseCase'
import { FindAllProductsUseCase } from '../../application/use-cases/product/FindAllProductsUseCase'
import { GetProductPaginationUseCase } from '../../application/use-cases/product/GetProductPaginationUseCase'
import { FindProductByIdUseCase } from '../../application/use-cases/product/FindProductByIdUseCase'
import { UpdateProductUseCase } from '../../application/use-cases/product/UpdateProductUseCase'
import { ProductDtoCreate, ProductDtoUpdate } from '../../application/dtos/ProductDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductController extends BaseController {
  readonly #createProductUseCase: CreateProductUseCase
  readonly #updateProductUseCase: UpdateProductUseCase
  readonly #findProductByIdUseCase: FindProductByIdUseCase
  readonly #findAllProductsUseCase: FindAllProductsUseCase
  readonly #getPaginationProductUseCase: GetProductPaginationUseCase
  readonly #deleteProductUseCase: DeleteProductUseCase

  constructor(
    createProductUseCase: CreateProductUseCase,
    updateProductUseCase: UpdateProductUseCase,
    findProductByIdUseCase: FindProductByIdUseCase,
    findAllProductsUseCase: FindAllProductsUseCase,
    getPaginationProductUseCase: GetProductPaginationUseCase,
    deleteProductUseCase: DeleteProductUseCase
  ) {
    super()
    this.#createProductUseCase = createProductUseCase
    this.#updateProductUseCase = updateProductUseCase
    this.#findProductByIdUseCase = findProductByIdUseCase
    this.#findAllProductsUseCase = findAllProductsUseCase
    this.#getPaginationProductUseCase = getPaginationProductUseCase
    this.#deleteProductUseCase = deleteProductUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createProductDto: ProductDtoCreate = req.body

    try {
      const createdProduct = await this.#createProductUseCase.execute(req.userContextService, createProductDto)
      return res.status(HTTP_STATUS.CREATED).json(createdProduct)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id
    const updateProductDto: ProductDtoUpdate = req.body

    try {
      const updatedProduct = await this.#updateProductUseCase.execute(req.userContextService, productId, updateProductDto)
      return res.status(HTTP_STATUS.OK).json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id

    try {
      const product = await this.#findProductByIdUseCase.execute(productId)
      if (!product) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(product)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.#findAllProductsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(products)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationProductUseCase.execute(
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
    const productId = req.params.id

    try {
      await this.#deleteProductUseCase.execute(productId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
