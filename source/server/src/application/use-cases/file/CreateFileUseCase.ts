import { File } from '../../../domain/entities/File'
import { FileDtoCreate, FileDtoView } from '../../dtos/FileDto'
import { IFileRepo } from '../../../domain/interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateFileUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileRepo: IFileRepo) {
    this.#fileRepo = fileRepo
  }

  async execute(userContextService: IUserContextService | undefined, createFileDto: FileDtoCreate): Promise<FileDtoView> {
    const file: File = {
      id: generateUUID(),
      name: createFileDto.name,
      status: createFileDto.status,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newFile = await this.#fileRepo.create(file)

    return FileMapper.toFileDtoView(newFile)
  }
}
