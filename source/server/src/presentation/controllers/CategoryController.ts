import { Request, Response } from 'express'
import { CreateCategoryUseCase } from '../../application/use-cases/category/CreateCategoryUseCase'
import { DeleteCategoryUseCase } from '../../application/use-cases/category/DeleteCategoryUseCase'
import { FindAllCategoriesUseCase } from '../../application/use-cases/category/FindAllCategoriesUseCase'
import { FindCategoryByIdUseCase } from '../../application/use-cases/category/FindCategoryByIdUseCase'
import { UpdateCategoryUseCase } from '../../application/use-cases/category/UpdateCategoryUseCase'
import { CreateCategoryDTO, UpdateCategoryDTO } from '../../application/dtos/CategoryDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class CategoryController extends BaseController {
  readonly #createCategoryUseCase: CreateCategoryUseCase
  readonly #updateCategoryUseCase: UpdateCategoryUseCase
  readonly #findCategoryByIdUseCase: FindCategoryByIdUseCase
  readonly #findAllCategoriesUseCase: FindAllCategoriesUseCase
  readonly #deleteCategoryUseCase: DeleteCategoryUseCase

  constructor(
    createCategoryUseCase: CreateCategoryUseCase,
    updateCategoryUseCase: UpdateCategoryUseCase,
    findCategoryByIdUseCase: FindCategoryByIdUseCase,
    findAllCategoriesUseCase: FindAllCategoriesUseCase,
    deleteCategoryUseCase: DeleteCategoryUseCase
  ) {
    super()
    this.#createCategoryUseCase = createCategoryUseCase
    this.#updateCategoryUseCase = updateCategoryUseCase
    this.#findCategoryByIdUseCase = findCategoryByIdUseCase
    this.#findAllCategoriesUseCase = findAllCategoriesUseCase
    this.#deleteCategoryUseCase = deleteCategoryUseCase
  }

  async create(req: Request, res: Response) {
    const createCategoryDTO: CreateCategoryDTO = req.body

    try {
      const createdCategory = await this.#createCategoryUseCase.execute(createCategoryDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdCategory)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const categoryId = req.params.id
    const updateCategoryDTO: UpdateCategoryDTO = req.body

    try {
      const updatedCategory = await this.#updateCategoryUseCase.execute(
        categoryId,
        updateCategoryDTO
      )
      return res.status(HTTP_STATUS.OK).json(updatedCategory)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const categoryId = req.params.id

    try {
      const category = await this.#findCategoryByIdUseCase.execute(categoryId)
      if (!category) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(category)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const categories = await this.#findAllCategoriesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(categories)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const categoryId = req.params.id

    try {
      await this.#deleteCategoryUseCase.execute(categoryId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
