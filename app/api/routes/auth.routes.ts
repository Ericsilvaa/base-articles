import { Router } from 'express'
import authController from '@controllers/admin/index'

const router = Router()

router.post('/register', authController.registerUser.bind(authController))
router.post('/login', authController.singIn.bind(authController))
router.delete('/logout', authController.logout.bind(authController))
// Adicione outras rotas de usuários conforme necessário

export default router
