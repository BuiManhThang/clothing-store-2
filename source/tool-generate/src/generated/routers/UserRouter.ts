import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createUserRouter = (userController: UserController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => userController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => userController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => userController.findById(req, res, next))
  router.post('/', (req, res, next) => userController.create(req, res, next))
  router.put('/:id', (req, res, next) => userController.update(req, res, next))
  router.delete('/:id', (req, res, next) => userController.delete(req, res, next))

  return router
}
