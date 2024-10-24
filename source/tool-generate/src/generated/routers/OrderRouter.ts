import { Router } from 'express'
import { OrderController } from '../controllers/OrderController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createOrderRouter = (orderController: OrderController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => orderController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => orderController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => orderController.findById(req, res, next))
  router.post('/', (req, res, next) => orderController.create(req, res, next))
  router.put('/:id', (req, res, next) => orderController.update(req, res, next))
  router.delete('/:id', (req, res, next) => orderController.delete(req, res, next))

  return router
}
