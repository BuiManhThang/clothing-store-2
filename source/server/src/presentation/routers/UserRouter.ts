import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createUserRouter = (
  userController: UserController,
  authMiddleware: AuthMiddleware
) => {
  const router = Router()

  router.get(
    '/',
    (req, res, next) => authMiddleware.handle(req, res, next),
    (req, res) => userController.findAll(req, res)
  )
  router.get('/:id', (req, res) => userController.findById(req, res))
  router.post('/', (req, res) => userController.create(req, res))
  router.put('/:id', (req, res) => userController.update(req, res))
  router.delete('/:id', (req, res) => userController.delete(req, res))

  return router
}
