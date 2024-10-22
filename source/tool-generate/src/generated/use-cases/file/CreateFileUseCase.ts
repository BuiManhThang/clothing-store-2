import { File } from '../../../domain/entities/File'
import { CreateFileDTO, ViewFileDTO } from '../../dtos/FileDTO'
import { IFileRepo } from '../../interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateFileUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileRepo: IFileRepo) {
    this.#fileRepo = fileRepo
  }

  async execute(createFileDto: CreateFileDTO): Promise<ViewFileDTO> {
    const file: File = {
      id: generateUUID(),
      name: createFileDto.name,
      status: createFileDto.status,
      createdAt: new Date(),
      createdBy: '',
    }

    const newFile = await this.#fileRepo.create(file)

    return FileMapper.toViewFileDTO(newFile)
  }
}
