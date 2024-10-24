import { FileDtoView } from '../../dtos/FileDto'
import { IFileRepo } from '../../../domain/interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'

export class FindAllFilesUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileService: IFileRepo) {
    this.#fileRepo = fileService
  }

  async execute(): Promise<FileDtoView[]> {
    const files = await this.#fileRepo.findAll()
    return files.map((file) => FileMapper.toFileDtoView(file))
  }
}
