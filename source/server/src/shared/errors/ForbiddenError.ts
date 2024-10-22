import { HTTP_STATUS } from '../constants/httpStatus'
import { AppError } from './AppError'

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, undefined, HTTP_STATUS.FORBIDDEN)
  }
}
