import { Router } from 'express'
import { FileController } from '../controllers/FileController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createFileRouter = (fileController: FileController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => fileController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => fileController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => fileController.findById(req, res, next))
  router.post('/', (req, res, next) => fileController.create(req, res, next))
  router.put('/:id', (req, res, next) => fileController.update(req, res, next))
  router.delete('/:id', (req, res, next) => fileController.delete(req, res, next))

  return router
}
