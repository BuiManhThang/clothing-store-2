import { HTTP_STATUS } from '../constants/httpStatus'
import { AppError } from './AppError'

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, undefined, HTTP_STATUS.UNAUTHORIZED)
  }
}
