import { Request, Response } from 'express'
import { CreateFileUseCase } from '../../application/use-cases/file/CreateFileUseCase'
import { DeleteFileUseCase } from '../../application/use-cases/file/DeleteFileUseCase'
import { FindAllFilesUseCase } from '../../application/use-cases/file/FindAllFilesUseCase'
import { FindFileByIdUseCase } from '../../application/use-cases/file/FindFileByIdUseCase'
import { UpdateFileUseCase } from '../../application/use-cases/file/UpdateFileUseCase'
import { CreateFileDTO, UpdateFileDTO } from '../../application/dtos/FileDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class FileController extends BaseController {
  readonly #createFileUseCase: CreateFileUseCase
  readonly #updateFileUseCase: UpdateFileUseCase
  readonly #findFileByIdUseCase: FindFileByIdUseCase
  readonly #findAllFilesUseCase: FindAllFilesUseCase
  readonly #deleteFileUseCase: DeleteFileUseCase

  constructor(
    createFileUseCase: CreateFileUseCase,
    updateFileUseCase: UpdateFileUseCase,
    findFileByIdUseCase: FindFileByIdUseCase,
    findAllFilesUseCase: FindAllFilesUseCase,
    deleteFileUseCase: DeleteFileUseCase
  ) {
    super()
    this.#createFileUseCase = createFileUseCase
    this.#updateFileUseCase = updateFileUseCase
    this.#findFileByIdUseCase = findFileByIdUseCase
    this.#findAllFilesUseCase = findAllFilesUseCase
    this.#deleteFileUseCase = deleteFileUseCase
  }

  async create(req: Request, res: Response) {
    const createFileDTO: CreateFileDTO = req.body

    try {
      const createdFile = await this.#createFileUseCase.execute(createFileDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdFile)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const fileId = req.params.id
    const updateFileDTO: UpdateFileDTO = req.body

    try {
      const updatedFile = await this.#updateFileUseCase.execute(fileId, updateFileDTO)
      return res.status(HTTP_STATUS.OK).json(updatedFile)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const fileId = req.params.id

    try {
      const file = await this.#findFileByIdUseCase.execute(fileId)
      if (!file) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(file)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const files = await this.#findAllFilesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(files)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const fileId = req.params.id

    try {
      await this.#deleteFileUseCase.execute(fileId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
