import { Request, Response, NextFunction } from 'express'
import { CreateProductColorUseCase } from '../../application/use-cases/productColor/CreateProductColorUseCase'
import { DeleteProductColorUseCase } from '../../application/use-cases/productColor/DeleteProductColorUseCase'
import { FindAllProductColorsUseCase } from '../../application/use-cases/productColor/FindAllProductColorsUseCase'
import { GetProductColorPaginationUseCase } from '../../application/use-cases/productColor/GetProductColorPaginationUseCase'
import { FindProductColorByIdUseCase } from '../../application/use-cases/productColor/FindProductColorByIdUseCase'
import { UpdateProductColorUseCase } from '../../application/use-cases/productColor/UpdateProductColorUseCase'
import { ProductColorDtoCreate, ProductColorDtoUpdate } from '../../application/dtos/ProductColorDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductColorController extends BaseController {
  readonly #createProductColorUseCase: CreateProductColorUseCase
  readonly #updateProductColorUseCase: UpdateProductColorUseCase
  readonly #findProductColorByIdUseCase: FindProductColorByIdUseCase
  readonly #findAllProductColorsUseCase: FindAllProductColorsUseCase
  readonly #getPaginationProductColorUseCase: GetProductColorPaginationUseCase
  readonly #deleteProductColorUseCase: DeleteProductColorUseCase

  constructor(
    createProductColorUseCase: CreateProductColorUseCase,
    updateProductColorUseCase: UpdateProductColorUseCase,
    findProductColorByIdUseCase: FindProductColorByIdUseCase,
    findAllProductColorsUseCase: FindAllProductColorsUseCase,
    getPaginationProductColorUseCase: GetProductColorPaginationUseCase,
    deleteProductColorUseCase: DeleteProductColorUseCase
  ) {
    super()
    this.#createProductColorUseCase = createProductColorUseCase
    this.#updateProductColorUseCase = updateProductColorUseCase
    this.#findProductColorByIdUseCase = findProductColorByIdUseCase
    this.#findAllProductColorsUseCase = findAllProductColorsUseCase
    this.#getPaginationProductColorUseCase = getPaginationProductColorUseCase
    this.#deleteProductColorUseCase = deleteProductColorUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createProductColorDto: ProductColorDtoCreate = req.body

    try {
      const createdProductColor = await this.#createProductColorUseCase.execute(req.userContextService, createProductColorDto)
      return res.status(HTTP_STATUS.CREATED).json(createdProductColor)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const productColorId = req.params.id
    const updateProductColorDto: ProductColorDtoUpdate = req.body

    try {
      const updatedProductColor = await this.#updateProductColorUseCase.execute(req.userContextService, productColorId, updateProductColorDto)
      return res.status(HTTP_STATUS.OK).json(updatedProductColor)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const productColorId = req.params.id

    try {
      const productColor = await this.#findProductColorByIdUseCase.execute(productColorId)
      if (!productColor) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productColor)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const productColors = await this.#findAllProductColorsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productColors)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationProductColorUseCase.execute(
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
    const productColorId = req.params.id

    try {
      await this.#deleteProductColorUseCase.execute(productColorId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
