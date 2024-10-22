import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

export const createAuthRouter = (authController: AuthController) => {
  const router = Router()

  router.post('/register', (req, res, next) => authController.register(req, res, next))
  router.post('/login', (req, res, next) => authController.login(req, res, next))
  router.post('/refresh-token', (req, res, next) => authController.refreshToken(req, res, next))
  router.post('/logout', (req, res, next) => authController.logout(req, res, next))

  return router
}
