import { Router } from 'express'
import { CouponController } from '../controllers/CouponController'

export const createCouponRouter = (couponController: CouponController) => {
  const router = Router()

  router.get('/', (req, res) => couponController.findAll(req, res))
  router.get('/:id', (req, res) => couponController.findById(req, res))
  router.post('/', (req, res) => couponController.create(req, res))
  router.put('/:id', (req, res) => couponController.update(req, res))
  router.delete('/:id', (req, res) => couponController.delete(req, res))

  return router
}
