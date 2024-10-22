import { Router } from 'express'
import { ReceiptDetailController } from '../controllers/ReceiptDetailController'

export const createReceiptDetailRouter = (receiptDetailController: ReceiptDetailController) => {
  const router = Router()

  router.get('/', (req, res) => receiptDetailController.findAll(req, res))
  router.get('/:id', (req, res) => receiptDetailController.findById(req, res))
  router.post('/', (req, res) => receiptDetailController.create(req, res))
  router.put('/:id', (req, res) => receiptDetailController.update(req, res))
  router.delete('/:id', (req, res) => receiptDetailController.delete(req, res))

  return router
}
