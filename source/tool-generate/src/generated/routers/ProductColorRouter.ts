import { Router } from 'express'
import { ProductColorController } from '../controllers/ProductColorController'

export const createProductColorRouter = (productColorController: ProductColorController) => {
  const router = Router()

  router.get('/', (req, res) => productColorController.findAll(req, res))
  router.get('/:id', (req, res) => productColorController.findById(req, res))
  router.post('/', (req, res) => productColorController.create(req, res))
  router.put('/:id', (req, res) => productColorController.update(req, res))
  router.delete('/:id', (req, res) => productColorController.delete(req, res))

  return router
}
