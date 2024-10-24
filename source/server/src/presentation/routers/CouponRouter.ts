import { Router } from 'express'
import { CouponController } from '../controllers/CouponController'
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware'

export const createCouponRouter = (couponController: CouponController, authMiddleware: AuthMiddleware) => {
  const router = Router()

  router.get('/', (req, res, next) => couponController.findAll(req, res, next))
  router.get('/pagination', (req, res, next) => couponController.getPagination(req, res, next))
  router.get('/:id', (req, res, next) => couponController.findById(req, res, next))
  router.post('/', (req, res, next) => couponController.create(req, res, next))
  router.put('/:id', (req, res, next) => couponController.update(req, res, next))
  router.delete('/:id', (req, res, next) => couponController.delete(req, res, next))

  return router
}
