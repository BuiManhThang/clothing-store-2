import { Router } from 'express'
import { ReceiptController } from '../controllers/ReceiptController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createReceiptRouter = (receiptController: ReceiptController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => receiptController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => receiptController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => receiptController.findById(req, res, next))
  router.post('/', (req, res, next) => receiptController.create(req, res, next))
  router.put('/:id', (req, res, next) => receiptController.update(req, res, next))
  router.delete('/:id', (req, res, next) => receiptController.delete(req, res, next))

  return router
}
