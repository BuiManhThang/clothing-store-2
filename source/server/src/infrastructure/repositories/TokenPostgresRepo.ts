import { ITokenRepo } from '../../domain/interfaces/repositories/ITokenRepo'
import { Token } from '../../domain/entities/Token'
import { BasePostgresRepo } from './BasePostgresRepo'

export class TokenPostgresRepo extends BasePostgresRepo<Token> implements ITokenRepo {
  constructor() {
    super('tokens')
  }

  async deleteByRefreshToken(refreshToken: string): Promise<void> {
    await this._query(`delete from "${this._tableName}" where "refreshToken" = $1`, [refreshToken])
  }

  async findRefreshTokenByUserId(userId: string): Promise<Token | null> {
    const result = await this._query(`select * from "${this._tableName}" where "userId" = $1`, [
      userId,
    ])
    if (result.rows.length) return result.rows[0]
    return null
  }

  async deleteAll(): Promise<void> {
    await this._query(`delete from "${this._tableName}"`)
  }
}
