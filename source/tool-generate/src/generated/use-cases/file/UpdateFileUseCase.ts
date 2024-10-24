import { File } from '../../../domain/entities/File'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { FileDtoUpdate, FileDtoView } from '../../dtos/FileDto'
import { IFileRepo } from '../../../domain/interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateFileUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileRepo: IFileRepo) {
    this.#fileRepo = fileRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatefileDto: FileDtoUpdate): Promise<FileDtoView | null> {
    const oldFile = await this.#fileRepo.findById(id)
    if (!oldFile) throw new NotFoundError('')

    const file: File = {
      id: oldFile.id,
      name: updatefileDto.name,
      status: updatefileDto.status,
      createdAt: oldFile.createdAt,
      createdBy: oldFile.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedFile = await this.#fileRepo.update(id, file)

    if (updatedFile) return FileMapper.toFileDtoView(updatedFile)
    return null
  }
}
