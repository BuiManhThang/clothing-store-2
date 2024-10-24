import { Router } from 'express'
import { OrderDetailController } from '../controllers/OrderDetailController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createOrderDetailRouter = (orderDetailController: OrderDetailController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => orderDetailController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => orderDetailController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => orderDetailController.findById(req, res, next))
  router.post('/', (req, res, next) => orderDetailController.create(req, res, next))
  router.put('/:id', (req, res, next) => orderDetailController.update(req, res, next))
  router.delete('/:id', (req, res, next) => orderDetailController.delete(req, res, next))

  return router
}
