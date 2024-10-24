import { Router } from 'express'
import { ReviewController } from '../controllers/ReviewController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createReviewRouter = (reviewController: ReviewController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => reviewController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => reviewController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => reviewController.findById(req, res, next))
  router.post('/', (req, res, next) => reviewController.create(req, res, next))
  router.put('/:id', (req, res, next) => reviewController.update(req, res, next))
  router.delete('/:id', (req, res, next) => reviewController.delete(req, res, next))

  return router
}
