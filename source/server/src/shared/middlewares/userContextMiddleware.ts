import { NextFunction, Request, Response } from 'express'
import { UserContextService } from '../../infrastructure/services/UserContextService'

export const userContextMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  req.userContextService = new UserContextService(req)
  next()
}
