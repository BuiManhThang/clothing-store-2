import { Router } from 'express'
import { ProductInventoryController } from '../controllers/ProductInventoryController'

export const createProductInventoryRouter = (productInventoryController: ProductInventoryController) => {
  const router = Router()

  router.get('/', (req, res) => productInventoryController.findAll(req, res))
  router.get('/:id', (req, res) => productInventoryController.findById(req, res))
  router.post('/', (req, res) => productInventoryController.create(req, res))
  router.put('/:id', (req, res) => productInventoryController.update(req, res))
  router.delete('/:id', (req, res) => productInventoryController.delete(req, res))

  return router
}
