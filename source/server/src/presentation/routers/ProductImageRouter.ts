import { Router } from 'express'
import { ProductImageController } from '../controllers/ProductImageController'

export const createProductImageRouter = (productImageController: ProductImageController) => {
  const router = Router()

  router.get('/', (req, res) => productImageController.findAll(req, res))
  router.get('/:id', (req, res) => productImageController.findById(req, res))
  router.post('/', (req, res) => productImageController.create(req, res))
  router.put('/:id', (req, res) => productImageController.update(req, res))
  router.delete('/:id', (req, res) => productImageController.delete(req, res))

  return router
}
