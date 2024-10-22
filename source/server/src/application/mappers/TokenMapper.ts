import { Token } from '../../domain/entities/Token'
import { ViewTokenDTO } from '../dtos/TokenDTO'

export class TokenMapper {
  static toViewTokenDTO(token: Token): ViewTokenDTO {
    return token
  }
}
