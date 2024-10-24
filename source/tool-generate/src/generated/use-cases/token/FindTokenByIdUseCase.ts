import { TokenDtoView } from '../../dtos/TokenDto'
import { ITokenRepo } from '../../../domain/interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'

export class FindTokenByIdUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenRepo: ITokenRepo) {
    this.#tokenRepo = tokenRepo
  }

  async execute(id: string): Promise<TokenDtoView | null> {
    const token = await this.#tokenRepo.findById(id)
    if (!token) return null
    return TokenMapper.toTokenDtoView(token)
  }
}
