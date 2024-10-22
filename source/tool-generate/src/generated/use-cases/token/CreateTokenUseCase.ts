import { Token } from '../../../domain/entities/Token'
import { CreateTokenDTO, ViewTokenDTO } from '../../dtos/TokenDTO'
import { ITokenRepo } from '../../interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateTokenUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenRepo: ITokenRepo) {
    this.#tokenRepo = tokenRepo
  }

  async execute(createTokenDto: CreateTokenDTO): Promise<ViewTokenDTO> {
    const token: Token = {
      id: generateUUID(),
      userId: createTokenDto.userId,
      expireDate: createTokenDto.expireDate,
      refreshToken: createTokenDto.refreshToken,
      device: createTokenDto.device,
      createdAt: new Date(),
      createdBy: '',
    }

    const newToken = await this.#tokenRepo.create(token)

    return TokenMapper.toViewTokenDTO(newToken)
  }
}
