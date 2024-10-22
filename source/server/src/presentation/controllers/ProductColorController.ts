import { Request, Response } from 'express'
import { CreateProductColorUseCase } from '../../application/use-cases/productColor/CreateProductColorUseCase'
import { DeleteProductColorUseCase } from '../../application/use-cases/productColor/DeleteProductColorUseCase'
import { FindAllProductColorsUseCase } from '../../application/use-cases/productColor/FindAllProductColorsUseCase'
import { FindProductColorByIdUseCase } from '../../application/use-cases/productColor/FindProductColorByIdUseCase'
import { UpdateProductColorUseCase } from '../../application/use-cases/productColor/UpdateProductColorUseCase'
import { CreateProductColorDTO, UpdateProductColorDTO } from '../../application/dtos/ProductColorDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductColorController extends BaseController {
  readonly #createProductColorUseCase: CreateProductColorUseCase
  readonly #updateProductColorUseCase: UpdateProductColorUseCase
  readonly #findProductColorByIdUseCase: FindProductColorByIdUseCase
  readonly #findAllProductColorsUseCase: FindAllProductColorsUseCase
  readonly #deleteProductColorUseCase: DeleteProductColorUseCase

  constructor(
    createProductColorUseCase: CreateProductColorUseCase,
    updateProductColorUseCase: UpdateProductColorUseCase,
    findProductColorByIdUseCase: FindProductColorByIdUseCase,
    findAllProductColorsUseCase: FindAllProductColorsUseCase,
    deleteProductColorUseCase: DeleteProductColorUseCase
  ) {
    super()
    this.#createProductColorUseCase = createProductColorUseCase
    this.#updateProductColorUseCase = updateProductColorUseCase
    this.#findProductColorByIdUseCase = findProductColorByIdUseCase
    this.#findAllProductColorsUseCase = findAllProductColorsUseCase
    this.#deleteProductColorUseCase = deleteProductColorUseCase
  }

  async create(req: Request, res: Response) {
    const createProductColorDTO: CreateProductColorDTO = req.body

    try {
      const createdProductColor = await this.#createProductColorUseCase.execute(createProductColorDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdProductColor)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const productColorId = req.params.id
    const updateProductColorDTO: UpdateProductColorDTO = req.body

    try {
      const updatedProductColor = await this.#updateProductColorUseCase.execute(productColorId, updateProductColorDTO)
      return res.status(HTTP_STATUS.OK).json(updatedProductColor)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const productColorId = req.params.id

    try {
      const productColor = await this.#findProductColorByIdUseCase.execute(productColorId)
      if (!productColor) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productColor)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const productColors = await this.#findAllProductColorsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productColors)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const productColorId = req.params.id

    try {
      await this.#deleteProductColorUseCase.execute(productColorId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
