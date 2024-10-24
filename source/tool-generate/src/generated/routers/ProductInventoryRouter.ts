import { Router } from 'express'
import { ProductInventoryController } from '../controllers/ProductInventoryController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createProductInventoryRouter = (productInventoryController: ProductInventoryController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => productInventoryController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => productInventoryController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => productInventoryController.findById(req, res, next))
  router.post('/', (req, res, next) => productInventoryController.create(req, res, next))
  router.put('/:id', (req, res, next) => productInventoryController.update(req, res, next))
  router.delete('/:id', (req, res, next) => productInventoryController.delete(req, res, next))

  return router
}
