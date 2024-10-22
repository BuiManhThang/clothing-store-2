import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../shared/errors/AppError'
import { HTTP_STATUS } from '../constants/httpStatus'

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    // Lỗi có thể dự đoán được (do người dùng, hoặc lỗi nghiệp vụ)
    return res.status(err.statusCode).json({
      data: err.data,
      statusCode: err.statusCode,
      message: err.message,
    })
  }

  // Lỗi không lường trước (lỗi hệ thống)
  console.error('Unexpected Error: ', err)
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  })
}
