import { Router } from 'express'
import { TokenController } from '../controllers/TokenController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createTokenRouter = (tokenController: TokenController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => tokenController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => tokenController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => tokenController.findById(req, res, next))
  router.post('/', (req, res, next) => tokenController.create(req, res, next))
  router.put('/:id', (req, res, next) => tokenController.update(req, res, next))
  router.delete('/:id', (req, res, next) => tokenController.delete(req, res, next))

  return router
}
