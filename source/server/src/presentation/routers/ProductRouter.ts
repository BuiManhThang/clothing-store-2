import { Router } from 'express'
import { ProductController } from '../controllers/ProductController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createProductRouter = (productController: ProductController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => productController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => productController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => productController.findById(req, res, next))
  router.post('/', (req, res, next) => productController.create(req, res, next))
  router.put('/:id', (req, res, next) => productController.update(req, res, next))
  router.delete('/:id', (req, res, next) => productController.delete(req, res, next))

  return router
}
