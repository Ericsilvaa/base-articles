import { Router } from 'express'
import usersController from '@controllers/users/index'
import { Upload } from '@config/multer'

const router = Router()
const up = Upload.uploadMulter()

router.get('/', usersController.getUserCurrent.bind(usersController))
router.put('/update', usersController.updateUser.bind(usersController))
router.put(
  '/update/photo',
  up.single('img_profile'),
  usersController.updateProfilePhoto.bind(usersController)
)

// Adicione outras rotas de usuários conforme necessário

export default router
