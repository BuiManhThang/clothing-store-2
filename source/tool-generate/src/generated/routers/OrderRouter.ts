import { Router } from 'express'
import { OrderController } from '../controllers/OrderController'

export const createOrderRouter = (orderController: OrderController) => {
  const router = Router()

  router.get('/', (req, res) => orderController.findAll(req, res))
  router.get('/:id', (req, res) => orderController.findById(req, res))
  router.post('/', (req, res) => orderController.create(req, res))
  router.put('/:id', (req, res) => orderController.update(req, res))
  router.delete('/:id', (req, res) => orderController.delete(req, res))

  return router
}
