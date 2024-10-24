import { Router } from 'express'
import { CardController } from '../controllers/CardController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createCardRouter = (cardController: CardController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => cardController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => cardController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => cardController.findById(req, res, next))
  router.post('/', (req, res, next) => cardController.create(req, res, next))
  router.put('/:id', (req, res, next) => cardController.update(req, res, next))
  router.delete('/:id', (req, res, next) => cardController.delete(req, res, next))

  return router
}
