import { ViewTokenDTO } from '../../dtos/TokenDTO'
import { ITokenRepo } from '../../interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'

export class FindTokenByIdUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenRepo: ITokenRepo) {
    this.#tokenRepo = tokenRepo
  }

  async execute(id: string): Promise<ViewTokenDTO | null> {
    const token = await this.#tokenRepo.findById(id)
    if (!token) return null
    return TokenMapper.toViewTokenDTO(token)
  }
}
