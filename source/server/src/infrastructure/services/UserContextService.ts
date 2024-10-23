import jwt from 'jsonwebtoken' // Giả sử bạn dùng thư viện này
import { IUserContextService } from '../../application/interfaces/IUserContextService'
import { Request } from 'express'
import { AuthContext } from '../../application/dtos/AuthDto'

export class UserContextService implements IUserContextService {
  readonly #request: Request

  constructor(request: Request) {
    this.#request = request
  }

  getCurrentUserId(): string | null {
    const token = this.#getToken()
    if (token) {
      const decodedToken = jwt.decode(token) as AuthContext | null
      return decodedToken?.userId || null
    }
    return null
  }

  getCurrentUserRoleId(): string | null {
    const token = this.#getToken()
    if (token) {
      const decodedToken = jwt.decode(token) as AuthContext | null
      return decodedToken?.roleId || null
    }
    return null
  }

  getCurrentUserRoleCode(): string | null {
    const token = this.#getToken()
    if (token) {
      const decodedToken = jwt.decode(token) as AuthContext | null
      return decodedToken?.roleCode || null
    }
    return null
  }

  #getToken(): string | null {
    const authHeader = this.#request.headers['authorization']
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]
    }
    return null
  }
}
