import { Request, Response, NextFunction } from 'express'
import { CreateProductInventoryUseCase } from '../../application/use-cases/productInventory/CreateProductInventoryUseCase'
import { DeleteProductInventoryUseCase } from '../../application/use-cases/productInventory/DeleteProductInventoryUseCase'
import { FindAllProductInventoryUseCase } from '../../application/use-cases/productInventory/FindAllProductInventoryUseCase'
import { GetProductInventoryPaginationUseCase } from '../../application/use-cases/productInventory/GetProductInventoryPaginationUseCase'
import { FindProductInventoryByIdUseCase } from '../../application/use-cases/productInventory/FindProductInventoryByIdUseCase'
import { UpdateProductInventoryUseCase } from '../../application/use-cases/productInventory/UpdateProductInventoryUseCase'
import { ProductInventoryDtoCreate, ProductInventoryDtoUpdate } from '../../application/dtos/ProductInventoryDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ProductInventoryController extends BaseController {
  readonly #createProductInventoryUseCase: CreateProductInventoryUseCase
  readonly #updateProductInventoryUseCase: UpdateProductInventoryUseCase
  readonly #findProductInventoryByIdUseCase: FindProductInventoryByIdUseCase
  readonly #findAllProductInventoryUseCase: FindAllProductInventoryUseCase
  readonly #getPaginationProductInventoryUseCase: GetProductInventoryPaginationUseCase
  readonly #deleteProductInventoryUseCase: DeleteProductInventoryUseCase

  constructor(
    createProductInventoryUseCase: CreateProductInventoryUseCase,
    updateProductInventoryUseCase: UpdateProductInventoryUseCase,
    findProductInventoryByIdUseCase: FindProductInventoryByIdUseCase,
    findAllProductInventoryUseCase: FindAllProductInventoryUseCase,
    getPaginationProductInventoryUseCase: GetProductInventoryPaginationUseCase,
    deleteProductInventoryUseCase: DeleteProductInventoryUseCase
  ) {
    super()
    this.#createProductInventoryUseCase = createProductInventoryUseCase
    this.#updateProductInventoryUseCase = updateProductInventoryUseCase
    this.#findProductInventoryByIdUseCase = findProductInventoryByIdUseCase
    this.#findAllProductInventoryUseCase = findAllProductInventoryUseCase
    this.#getPaginationProductInventoryUseCase = getPaginationProductInventoryUseCase
    this.#deleteProductInventoryUseCase = deleteProductInventoryUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createProductInventoryDto: ProductInventoryDtoCreate = req.body

    try {
      const createdProductInventory = await this.#createProductInventoryUseCase.execute(req.userContextService, createProductInventoryDto)
      return res.status(HTTP_STATUS.CREATED).json(createdProductInventory)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const productInventoryId = req.params.id
    const updateProductInventoryDto: ProductInventoryDtoUpdate = req.body

    try {
      const updatedProductInventory = await this.#updateProductInventoryUseCase.execute(req.userContextService, productInventoryId, updateProductInventoryDto)
      return res.status(HTTP_STATUS.OK).json(updatedProductInventory)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const productInventoryId = req.params.id

    try {
      const productInventory = await this.#findProductInventoryByIdUseCase.execute(productInventoryId)
      if (!productInventory) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(productInventory)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const productInventory = await this.#findAllProductInventoryUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(productInventory)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationProductInventoryUseCase.execute(
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
    const productInventoryId = req.params.id

    try {
      await this.#deleteProductInventoryUseCase.execute(productInventoryId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
