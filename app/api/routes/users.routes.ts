import { Router } from 'express'
import usersController from '@controllers/users/index'

const router = Router()

router.get('/', usersController.getUserCurrent.bind(usersController))
router.put('/update', usersController.updateUser.bind(usersController))
router.put(
  '/update/photo',
  usersController.updateProfilePhoto.bind(usersController)
)

// Adicione outras rotas de usuários conforme necessário

export default router
