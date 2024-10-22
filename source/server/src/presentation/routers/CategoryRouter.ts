import { Router } from 'express'
import { CategoryController } from '../controllers/CategoryController'

export const createCategoryRouter = (categoryController: CategoryController) => {
  const router = Router()

  router.get('/', (req, res) => categoryController.findAll(req, res))
  router.get('/:id', (req, res) => categoryController.findById(req, res))
  router.post('/', (req, res) => categoryController.create(req, res))
  router.put('/:id', (req, res) => categoryController.update(req, res))
  router.delete('/:id', (req, res) => categoryController.delete(req, res))

  return router
}
