import { ViewFileDTO } from '../../dtos/FileDTO'
import { IFileRepo } from '../../interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'

export class FindAllFileUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileService: IFileRepo) {
    this.#fileRepo = fileService
  }

  async execute(): Promise<ViewFileDTO[]> {
    const file = await this.#fileRepo.findAll()
    return file.map((file) => FileMapper.toViewFileDTO(file))
  }
}
