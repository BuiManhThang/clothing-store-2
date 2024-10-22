import jwt from 'jsonwebtoken'
import config from '../../config'
import { IJwtService } from '../interfaces/services/IJwtService'

export class JwtService implements IJwtService {
  readonly #accessTokenSecret: string
  readonly #refreshTokenSecret: string

  constructor() {
    this.#accessTokenSecret = config.app.accessTokenSecret
    this.#refreshTokenSecret = config.app.refreshTokenSecret
  }

  createAccessToken(userId: string, roleId: string, roleCode: string): string {
    return jwt.sign({ userId, roleId, roleCode }, this.#accessTokenSecret, {
      expiresIn: config.app.accessTokenExpireSeconds, // Access token hết hạn sau 15 phút
    })
  }

  createRefreshToken(userId: string): string {
    return jwt.sign({ userId }, this.#refreshTokenSecret, {
      expiresIn: config.app.refreshTokenExpireSeconds, // Refresh token hết hạn sau 7 ngày
    })
  }

  verifyAccessToken(token: string): any {
    return jwt.verify(token, this.#accessTokenSecret)
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.#refreshTokenSecret)
  }
}
