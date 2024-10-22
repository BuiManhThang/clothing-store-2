import { Token } from '../../../domain/entities/Token'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateTokenDTO, ViewTokenDTO } from '../../dtos/TokenDTO'
import { ITokenRepo } from '../../interfaces/repositories/ITokenRepo'
import { TokenMapper } from '../../mappers/TokenMapper'

export class UpdateTokenUseCase {
  readonly #tokenRepo: ITokenRepo

  constructor(tokenRepo: ITokenRepo) {
    this.#tokenRepo = tokenRepo
  }

  async execute(id: string, updatetokenDTO: UpdateTokenDTO): Promise<ViewTokenDTO | null> {
    const oldToken = await this.#tokenRepo.findById(id)
    if (!oldToken) throw new NotFoundError('')

    const token: Token = {
      id: oldToken.id,
      userId: updatetokenDTO.userId,
      expireDate: updatetokenDTO.expireDate,
      refreshToken: updatetokenDTO.refreshToken,
      device: updatetokenDTO.device,
      createdAt: oldToken.createdAt,
      createdBy: oldToken.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedToken = await this.#tokenRepo.update(id, token)

    if (updatedToken) return TokenMapper.toViewTokenDTO(updatedToken)
    return null
  }
}
