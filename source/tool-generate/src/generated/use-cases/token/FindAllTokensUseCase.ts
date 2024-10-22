import { ViewTokenDTO } from '../../dtos/TokenDTO'
import { ITokenRepo } from '../../interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'

export class FindAllTokensUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenService: ITokenRepo) {
    this.#tokenRepo = tokenService
  }

  async execute(): Promise<ViewTokenDTO[]> {
    const tokens = await this.#tokenRepo.findAll()
    return tokens.map((token) => TokenMapper.toViewTokenDTO(token))
  }
}
