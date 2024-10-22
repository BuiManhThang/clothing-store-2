import { HTTP_STATUS } from '../constants/httpStatus'

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly data: any

  constructor(
    message: string,
    data: any,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true
  ) {
    super(message)
    this.data = data
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor) // Lưu lại stack trace
  }
}
