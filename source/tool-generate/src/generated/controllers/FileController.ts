import { Request, Response, NextFunction } from 'express'
import { CreateFileUseCase } from '../../application/use-cases/file/CreateFileUseCase'
import { DeleteFileUseCase } from '../../application/use-cases/file/DeleteFileUseCase'
import { FindAllFilesUseCase } from '../../application/use-cases/file/FindAllFilesUseCase'
import { GetFilePaginationUseCase } from '../../application/use-cases/file/GetFilePaginationUseCase'
import { FindFileByIdUseCase } from '../../application/use-cases/file/FindFileByIdUseCase'
import { UpdateFileUseCase } from '../../application/use-cases/file/UpdateFileUseCase'
import { FileDtoCreate, FileDtoUpdate } from '../../application/dtos/FileDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class FileController extends BaseController {
  readonly #createFileUseCase: CreateFileUseCase
  readonly #updateFileUseCase: UpdateFileUseCase
  readonly #findFileByIdUseCase: FindFileByIdUseCase
  readonly #findAllFilesUseCase: FindAllFilesUseCase
  readonly #getPaginationFileUseCase: GetFilePaginationUseCase
  readonly #deleteFileUseCase: DeleteFileUseCase

  constructor(
    createFileUseCase: CreateFileUseCase,
    updateFileUseCase: UpdateFileUseCase,
    findFileByIdUseCase: FindFileByIdUseCase,
    findAllFilesUseCase: FindAllFilesUseCase,
    getPaginationFileUseCase: GetFilePaginationUseCase,
    deleteFileUseCase: DeleteFileUseCase
  ) {
    super()
    this.#createFileUseCase = createFileUseCase
    this.#updateFileUseCase = updateFileUseCase
    this.#findFileByIdUseCase = findFileByIdUseCase
    this.#findAllFilesUseCase = findAllFilesUseCase
    this.#getPaginationFileUseCase = getPaginationFileUseCase
    this.#deleteFileUseCase = deleteFileUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createFileDto: FileDtoCreate = req.body

    try {
      const createdFile = await this.#createFileUseCase.execute(req.userContextService, createFileDto)
      return res.status(HTTP_STATUS.CREATED).json(createdFile)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const fileId = req.params.id
    const updateFileDto: FileDtoUpdate = req.body

    try {
      const updatedFile = await this.#updateFileUseCase.execute(req.userContextService, fileId, updateFileDto)
      return res.status(HTTP_STATUS.OK).json(updatedFile)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const fileId = req.params.id

    try {
      const file = await this.#findFileByIdUseCase.execute(fileId)
      if (!file) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(file)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const files = await this.#findAllFilesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(files)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationFileUseCase.execute(
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
    const fileId = req.params.id

    try {
      await this.#deleteFileUseCase.execute(fileId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
