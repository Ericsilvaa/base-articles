import { Router } from 'express'
import authController from '@controllers/auth/index'
import { registerValidation, singInValidation } from '../validations/auth'

const router = Router()

router.post(
  '/register',
  registerValidation,
  authController.registerUser.bind(authController)
)
router.post(
  '/signIn',
  singInValidation,
  authController.singIn.bind(authController)
)
router.delete('/logout', authController.logout.bind(authController))
// Adicione outras rotas de usuários conforme necessário

export default router
