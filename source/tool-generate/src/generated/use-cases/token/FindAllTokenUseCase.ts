import { ViewTokenDTO } from '../../dtos/TokenDTO'
import { ITokenRepo } from '../../interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'

export class FindAllTokenUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenService: ITokenRepo) {
    this.#tokenRepo = tokenService
  }

  async execute(): Promise<ViewTokenDTO[]> {
    const token = await this.#tokenRepo.findAll()
    return token.map((token) => TokenMapper.toViewTokenDTO(token))
  }
}
