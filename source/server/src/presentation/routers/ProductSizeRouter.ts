import { Router } from 'express'
import { ProductSizeController } from '../controllers/ProductSizeController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createProductSizeRouter = (productSizeController: ProductSizeController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => productSizeController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => productSizeController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => productSizeController.findById(req, res, next))
  router.post('/', (req, res, next) => productSizeController.create(req, res, next))
  router.put('/:id', (req, res, next) => productSizeController.update(req, res, next))
  router.delete('/:id', (req, res, next) => productSizeController.delete(req, res, next))

  return router
}
