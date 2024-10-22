import { Response } from 'express'
import { AppError } from '../../shared/errors/AppError'

export class BaseController {
  handleAppError(error: unknown, res: Response) {
    const appError = error as AppError
    return res.status(appError.statusCode).json(appError)
  }
}
