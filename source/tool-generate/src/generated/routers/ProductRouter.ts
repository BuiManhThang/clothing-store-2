import { Router } from 'express'
import { ProductController } from '../controllers/ProductController'

export const createProductRouter = (productController: ProductController) => {
  const router = Router()

  router.get('/', (req, res) => productController.findAll(req, res))
  router.get('/:id', (req, res) => productController.findById(req, res))
  router.post('/', (req, res) => productController.create(req, res))
  router.put('/:id', (req, res) => productController.update(req, res))
  router.delete('/:id', (req, res) => productController.delete(req, res))

  return router
}
