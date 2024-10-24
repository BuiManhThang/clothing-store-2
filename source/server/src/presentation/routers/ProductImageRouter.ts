import { Router } from 'express'
import { ProductImageController } from '../controllers/ProductImageController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createProductImageRouter = (productImageController: ProductImageController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => productImageController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => productImageController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => productImageController.findById(req, res, next))
  router.post('/', (req, res, next) => productImageController.create(req, res, next))
  router.put('/:id', (req, res, next) => productImageController.update(req, res, next))
  router.delete('/:id', (req, res, next) => productImageController.delete(req, res, next))

  return router
}
