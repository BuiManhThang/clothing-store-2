import { ViewFileDTO } from '../../dtos/FileDTO'
import { IFileRepo } from '../../interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'

export class FindAllFilesUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileService: IFileRepo) {
    this.#fileRepo = fileService
  }

  async execute(): Promise<ViewFileDTO[]> {
    const files = await this.#fileRepo.findAll()
    return files.map((file) => FileMapper.toViewFileDTO(file))
  }
}
