import { Router } from 'express'
import { FileController } from '../controllers/FileController'

export const createFileRouter = (fileController: FileController) => {
  const router = Router()

  router.get('/', (req, res) => fileController.findAll(req, res))
  router.get('/:id', (req, res) => fileController.findById(req, res))
  router.post('/', (req, res) => fileController.create(req, res))
  router.put('/:id', (req, res) => fileController.update(req, res))
  router.delete('/:id', (req, res) => fileController.delete(req, res))

  return router
}
