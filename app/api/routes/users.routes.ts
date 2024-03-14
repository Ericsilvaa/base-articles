import { Router } from 'express'
import usersController from '@controllers/users/index'

const router = Router()

router.post('/', usersController.createUser.bind(usersController))
// Adicione outras rotas de usuários conforme necessário

export default router
