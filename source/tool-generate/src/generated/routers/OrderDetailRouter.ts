import { Router } from 'express'
import { OrderDetailController } from '../controllers/OrderDetailController'

export const createOrderDetailRouter = (orderDetailController: OrderDetailController) => {
  const router = Router()

  router.get('/', (req, res) => orderDetailController.findAll(req, res))
  router.get('/:id', (req, res) => orderDetailController.findById(req, res))
  router.post('/', (req, res) => orderDetailController.create(req, res))
  router.put('/:id', (req, res) => orderDetailController.update(req, res))
  router.delete('/:id', (req, res) => orderDetailController.delete(req, res))

  return router
}
