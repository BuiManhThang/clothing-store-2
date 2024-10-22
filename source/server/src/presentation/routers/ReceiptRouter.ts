import { Router } from 'express'
import { ReceiptController } from '../controllers/ReceiptController'

export const createReceiptRouter = (receiptController: ReceiptController) => {
  const router = Router()

  router.get('/', (req, res) => receiptController.findAll(req, res))
  router.get('/:id', (req, res) => receiptController.findById(req, res))
  router.post('/', (req, res) => receiptController.create(req, res))
  router.put('/:id', (req, res) => receiptController.update(req, res))
  router.delete('/:id', (req, res) => receiptController.delete(req, res))

  return router
}
