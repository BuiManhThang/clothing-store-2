import { FileDtoView } from '../../dtos/FileDto'
import { IFileRepo } from '../../../domain/interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'

export class FindFileByIdUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileRepo: IFileRepo) {
    this.#fileRepo = fileRepo
  }

  async execute(id: string): Promise<FileDtoView | null> {
    const file = await this.#fileRepo.findById(id)
    if (!file) return null
    return FileMapper.toFileDtoView(file)
  }
}
