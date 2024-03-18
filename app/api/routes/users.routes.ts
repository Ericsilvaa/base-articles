import { Router } from 'express'
import usersController from '@controllers/users/index'

const router = Router()

router.post('/register', usersController.createUser.bind(usersController))
router.post('/login', usersController.singIn.bind(usersController))
// Adicione outras rotas de usuários conforme necessário

export default router
