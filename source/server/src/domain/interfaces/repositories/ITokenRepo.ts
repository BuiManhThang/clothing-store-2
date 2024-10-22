import { Token } from '../../entities/Token'
import { IBaseRepo } from './IBaseRepo'

export interface ITokenRepo extends IBaseRepo<Token> {
  deleteAll(): Promise<void>
  findRefreshTokenByUserId(userId: string): Promise<Token | null>
  deleteByRefreshToken(refreshToken: string): Promise<void>
}
