import { Router } from 'express'
import { ReceiptDetailController } from '../controllers/ReceiptDetailController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createReceiptDetailRouter = (receiptDetailController: ReceiptDetailController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => receiptDetailController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => receiptDetailController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => receiptDetailController.findById(req, res, next))
  router.post('/', (req, res, next) => receiptDetailController.create(req, res, next))
  router.put('/:id', (req, res, next) => receiptDetailController.update(req, res, next))
  router.delete('/:id', (req, res, next) => receiptDetailController.delete(req, res, next))

  return router
}
