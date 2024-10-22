import { Request, Response } from 'express'
import { CreateProductUseCase } from '../../application/use-cases/product/CreateProductUseCase'
import { DeleteProductUseCase } from '../../application/use-cases/product/DeleteProductUseCase'
import { FindAllProductsUseCase } from '../../application/use-cases/product/FindAllProductsUseCase'
import { FindProductByIdUseCase } from '../../application/use-cases/product/FindProductByIdUseCase'
import { UpdateProductUseCase } from '../../application/use-cases/product/UpdateProductUseCase'
import { CreateProductDTO, UpdateProductDTO } from '../../application/dtos/ProductDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductController extends BaseController {
  readonly #createProductUseCase: CreateProductUseCase
  readonly #updateProductUseCase: UpdateProductUseCase
  readonly #findProductByIdUseCase: FindProductByIdUseCase
  readonly #findAllProductsUseCase: FindAllProductsUseCase
  readonly #deleteProductUseCase: DeleteProductUseCase

  constructor(
    createProductUseCase: CreateProductUseCase,
    updateProductUseCase: UpdateProductUseCase,
    findProductByIdUseCase: FindProductByIdUseCase,
    findAllProductsUseCase: FindAllProductsUseCase,
    deleteProductUseCase: DeleteProductUseCase
  ) {
    super()
    this.#createProductUseCase = createProductUseCase
    this.#updateProductUseCase = updateProductUseCase
    this.#findProductByIdUseCase = findProductByIdUseCase
    this.#findAllProductsUseCase = findAllProductsUseCase
    this.#deleteProductUseCase = deleteProductUseCase
  }

  async create(req: Request, res: Response) {
    const createProductDTO: CreateProductDTO = req.body

    try {
      const createdProduct = await this.#createProductUseCase.execute(createProductDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdProduct)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const productId = req.params.id
    const updateProductDTO: UpdateProductDTO = req.body

    try {
      const updatedProduct = await this.#updateProductUseCase.execute(productId, updateProductDTO)
      return res.status(HTTP_STATUS.OK).json(updatedProduct)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const productId = req.params.id

    try {
      const product = await this.#findProductByIdUseCase.execute(productId)
      if (!product) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(product)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const products = await this.#findAllProductsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(products)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const productId = req.params.id

    try {
      await this.#deleteProductUseCase.execute(productId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
