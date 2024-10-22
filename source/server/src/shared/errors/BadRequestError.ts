import { HTTP_STATUS } from '../constants/httpStatus'
import { AppError } from './AppError'

export class BadRequestError extends AppError {
  constructor(message: string, data: any) {
    super(message, data, HTTP_STATUS.BAD_REQUEST)
  }
}
