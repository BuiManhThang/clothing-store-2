import { Router } from 'express'
import { CategoryController } from '../controllers/CategoryController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createCategoryRouter = (categoryController: CategoryController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => categoryController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => categoryController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => categoryController.findById(req, res, next))
  router.post('/', (req, res, next) => categoryController.create(req, res, next))
  router.put('/:id', (req, res, next) => categoryController.update(req, res, next))
  router.delete('/:id', (req, res, next) => categoryController.delete(req, res, next))

  return router
}
