import { Router } from 'express'
import { ProductColorController } from '../controllers/ProductColorController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createProductColorRouter = (productColorController: ProductColorController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => productColorController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => productColorController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => productColorController.findById(req, res, next))
  router.post('/', (req, res, next) => productColorController.create(req, res, next))
  router.put('/:id', (req, res, next) => productColorController.update(req, res, next))
  router.delete('/:id', (req, res, next) => productColorController.delete(req, res, next))

  return router
}
