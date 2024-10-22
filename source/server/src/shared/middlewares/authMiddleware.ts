import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../errors/UnauthorizedError'
import { IJwtService } from '../../application/interfaces/services/IJwtService'

export class AuthMiddleware {
  readonly #jwtService: IJwtService

  constructor(jwtService: IJwtService) {
    this.#jwtService = jwtService
  }

  handle(req: Request, _res: Response, next: NextFunction) {
    if (!req.headers.authorization?.includes('Bearer'))
      throw new UnauthorizedError('Authorization header is missing')
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new UnauthorizedError('Token is missing')

    try {
      const decoded = this.#jwtService.verifyAccessToken(token)
      req.authContext = decoded

      next()
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token')
    }
  }
}
