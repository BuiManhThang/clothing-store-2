import { File } from '../../../domain/entities/File'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateFileDTO, ViewFileDTO } from '../../dtos/FileDTO'
import { IFileRepo } from '../../../domain/interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'

export class UpdateFileUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileRepo: IFileRepo) {
    this.#fileRepo = fileRepo
  }

  async execute(id: string, updatefileDTO: UpdateFileDTO): Promise<ViewFileDTO | null> {
    const oldFile = await this.#fileRepo.findById(id)
    if (!oldFile) throw new NotFoundError('')

    const file: File = {
      id: oldFile.id,
      name: updatefileDTO.name,
      status: updatefileDTO.status,
      createdAt: oldFile.createdAt,
      createdBy: oldFile.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedFile = await this.#fileRepo.update(id, file)

    if (updatedFile) return FileMapper.toViewFileDTO(updatedFile)
    return null
  }
}
