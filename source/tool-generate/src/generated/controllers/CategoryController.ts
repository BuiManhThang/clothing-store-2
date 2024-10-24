import { Request, Response, NextFunction } from 'express'
import { CreateCategoryUseCase } from '../../application/use-cases/category/CreateCategoryUseCase'
import { DeleteCategoryUseCase } from '../../application/use-cases/category/DeleteCategoryUseCase'
import { FindAllCategoriesUseCase } from '../../application/use-cases/category/FindAllCategoriesUseCase'
import { GetCategoryPaginationUseCase } from '../../application/use-cases/category/GetCategoryPaginationUseCase'
import { FindCategoryByIdUseCase } from '../../application/use-cases/category/FindCategoryByIdUseCase'
import { UpdateCategoryUseCase } from '../../application/use-cases/category/UpdateCategoryUseCase'
import { CategoryDtoCreate, CategoryDtoUpdate } from '../../application/dtos/CategoryDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class CategoryController extends BaseController {
  readonly #createCategoryUseCase: CreateCategoryUseCase
  readonly #updateCategoryUseCase: UpdateCategoryUseCase
  readonly #findCategoryByIdUseCase: FindCategoryByIdUseCase
  readonly #findAllCategoriesUseCase: FindAllCategoriesUseCase
  readonly #getPaginationCategoryUseCase: GetCategoryPaginationUseCase
  readonly #deleteCategoryUseCase: DeleteCategoryUseCase

  constructor(
    createCategoryUseCase: CreateCategoryUseCase,
    updateCategoryUseCase: UpdateCategoryUseCase,
    findCategoryByIdUseCase: FindCategoryByIdUseCase,
    findAllCategoriesUseCase: FindAllCategoriesUseCase,
    getPaginationCategoryUseCase: GetCategoryPaginationUseCase,
    deleteCategoryUseCase: DeleteCategoryUseCase
  ) {
    super()
    this.#createCategoryUseCase = createCategoryUseCase
    this.#updateCategoryUseCase = updateCategoryUseCase
    this.#findCategoryByIdUseCase = findCategoryByIdUseCase
    this.#findAllCategoriesUseCase = findAllCategoriesUseCase
    this.#getPaginationCategoryUseCase = getPaginationCategoryUseCase
    this.#deleteCategoryUseCase = deleteCategoryUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createCategoryDto: CategoryDtoCreate = req.body

    try {
      const createdCategory = await this.#createCategoryUseCase.execute(req.userContextService, createCategoryDto)
      return res.status(HTTP_STATUS.CREATED).json(createdCategory)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const categoryId = req.params.id
    const updateCategoryDto: CategoryDtoUpdate = req.body

    try {
      const updatedCategory = await this.#updateCategoryUseCase.execute(req.userContextService, categoryId, updateCategoryDto)
      return res.status(HTTP_STATUS.OK).json(updatedCategory)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const categoryId = req.params.id

    try {
      const category = await this.#findCategoryByIdUseCase.execute(categoryId)
      if (!category) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(category)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.#findAllCategoriesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(categories)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationCategoryUseCase.execute(
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
    const categoryId = req.params.id

    try {
      await this.#deleteCategoryUseCase.execute(categoryId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
