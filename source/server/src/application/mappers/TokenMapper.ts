import { Token } from '../../domain/entities/Token'
import { TokenDtoView } from '../dtos/TokenDto'

export class TokenMapper {
  static toTokenDtoView(token: Token): TokenDtoView {
    return token
  }
}
