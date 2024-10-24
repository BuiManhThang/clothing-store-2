import { Token } from '../../../domain/entities/Token'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { TokenDtoUpdate, TokenDtoView } from '../../dtos/TokenDto'
import { ITokenRepo } from '../../../domain/interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateTokenUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenRepo: ITokenRepo) {
    this.#tokenRepo = tokenRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatetokenDto: TokenDtoUpdate): Promise<TokenDtoView | null> {
    const oldToken = await this.#tokenRepo.findById(id)
    if (!oldToken) throw new NotFoundError('')

    const token: Token = {
      id: oldToken.id,
      userId: updatetokenDto.userId,
      expireDate: updatetokenDto.expireDate,
      refreshToken: updatetokenDto.refreshToken,
      device: updatetokenDto.device,
      createdAt: oldToken.createdAt,
      createdBy: oldToken.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedToken = await this.#tokenRepo.update(id, token)

    if (updatedToken) return TokenMapper.toTokenDtoView(updatedToken)
    return null
  }
}
