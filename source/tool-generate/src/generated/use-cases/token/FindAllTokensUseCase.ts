import { TokenDtoView } from '../../dtos/TokenDto'
import { ITokenRepo } from '../../../domain/interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'

export class FindAllTokensUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenService: ITokenRepo) {
    this.#tokenRepo = tokenService
  }

  async execute(): Promise<TokenDtoView[]> {
    const tokens = await this.#tokenRepo.findAll()
    return tokens.map((token) => TokenMapper.toTokenDtoView(token))
  }
}
