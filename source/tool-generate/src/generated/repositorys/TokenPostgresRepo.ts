import { ITokenRepo } from '../../application/interfaces/repositories/ITokenRepo'
import { Token } from '../../domain/entities/Token'
import { BasePostgresRepo } from './BasePostgresRepo'

export class TokenPostgresRepo extends BasePostgresRepo<Token> implements ITokenRepo {
  constructor() {
    super('tokens')
  }
}
