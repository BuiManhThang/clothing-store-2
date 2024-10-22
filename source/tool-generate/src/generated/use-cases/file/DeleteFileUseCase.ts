import { IFileRepo } from '../../interfaces/repositories/IFileRepo'

export class DeleteFileUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileService: IFileRepo) {
    this.#fileRepo = fileService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#fileRepo.delete(id)
  }
}
