import { Router } from 'express'
import { RoleController } from '../controllers/RoleController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createRoleRouter = (roleController: RoleController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => roleController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => roleController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => roleController.findById(req, res, next))
  router.post('/', (req, res, next) => roleController.create(req, res, next))
  router.put('/:id', (req, res, next) => roleController.update(req, res, next))
  router.delete('/:id', (req, res, next) => roleController.delete(req, res, next))

  return router
}
