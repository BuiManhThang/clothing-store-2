import { Router } from 'express'
import { ProductInventorController } from '../controllers/ProductInventorController'

export const createProductInventorRouter = (productInventorController: ProductInventorController) => {
  const router = Router()

  router.get('/', (req, res) => productInventorController.findAll(req, res))
  router.get('/:id', (req, res) => productInventorController.findById(req, res))
  router.post('/', (req, res) => productInventorController.create(req, res))
  router.put('/:id', (req, res) => productInventorController.update(req, res))
  router.delete('/:id', (req, res) => productInventorController.delete(req, res))

  return router
}
