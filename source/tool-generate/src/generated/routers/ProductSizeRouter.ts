import { Router } from 'express'
import { ProductSizeController } from '../controllers/ProductSizeController'

export const createProductSizeRouter = (productSizeController: ProductSizeController) => {
  const router = Router()

  router.get('/', (req, res) => productSizeController.findAll(req, res))
  router.get('/:id', (req, res) => productSizeController.findById(req, res))
  router.post('/', (req, res) => productSizeController.create(req, res))
  router.put('/:id', (req, res) => productSizeController.update(req, res))
  router.delete('/:id', (req, res) => productSizeController.delete(req, res))

  return router
}
