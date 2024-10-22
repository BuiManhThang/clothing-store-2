import { Router } from 'express'
import { CardController } from '../controllers/CardController'

export const createCardRouter = (cardController: CardController) => {
  const router = Router()

  router.get('/', (req, res) => cardController.findAll(req, res))
  router.get('/:id', (req, res) => cardController.findById(req, res))
  router.post('/', (req, res) => cardController.create(req, res))
  router.put('/:id', (req, res) => cardController.update(req, res))
  router.delete('/:id', (req, res) => cardController.delete(req, res))

  return router
}
