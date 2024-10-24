import { Token } from '../../../domain/entities/Token'
import { TokenDtoCreate, TokenDtoView } from '../../dtos/TokenDto'
import { ITokenRepo } from '../../../domain/interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateTokenUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenRepo: ITokenRepo) {
    this.#tokenRepo = tokenRepo
  }

  async execute(userContextService: IUserContextService | undefined, createTokenDto: TokenDtoCreate): Promise<TokenDtoView> {
    const token: Token = {
      id: generateUUID(),
      userId: createTokenDto.userId,
      expireDate: createTokenDto.expireDate,
      refreshToken: createTokenDto.refreshToken,
      device: createTokenDto.device,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newToken = await this.#tokenRepo.create(token)

    return TokenMapper.toTokenDtoView(newToken)
  }
}
