import { Router } from 'express'
import { ReviewController } from '../controllers/ReviewController'

export const createReviewRouter = (reviewController: ReviewController) => {
  const router = Router()

  router.get('/', (req, res) => reviewController.findAll(req, res))
  router.get('/:id', (req, res) => reviewController.findById(req, res))
  router.post('/', (req, res) => reviewController.create(req, res))
  router.put('/:id', (req, res) => reviewController.update(req, res))
  router.delete('/:id', (req, res) => reviewController.delete(req, res))

  return router
}
