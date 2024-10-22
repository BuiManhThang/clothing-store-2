import { Router } from 'express'
import { TokenController } from '../controllers/TokenController'

export const createTokenRouter = (tokenController: TokenController) => {
  const router = Router()

  router.get('/', (req, res) => tokenController.findAll(req, res))
  router.get('/:id', (req, res) => tokenController.findById(req, res))
  router.post('/', (req, res) => tokenController.create(req, res))
  router.put('/:id', (req, res) => tokenController.update(req, res))
  router.delete('/:id', (req, res) => tokenController.delete(req, res))

  return router
}
