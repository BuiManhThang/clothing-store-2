import { ITokenRepo } from '../../interfaces/repositories/ITokenRepo'

export class DeleteTokenUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenService: ITokenRepo) {
    this.#tokenRepo = tokenService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#tokenRepo.delete(id)
  }
}
