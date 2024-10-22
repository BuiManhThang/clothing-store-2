import { ViewFileDTO } from '../../dtos/FileDTO'
import { IFileRepo } from '../../../domain/interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'

export class FindFileByIdUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileRepo: IFileRepo) {
    this.#fileRepo = fileRepo
  }

  async execute(id: string): Promise<ViewFileDTO | null> {
    const file = await this.#fileRepo.findById(id)
    if (!file) return null
    return FileMapper.toViewFileDTO(file)
  }
}
