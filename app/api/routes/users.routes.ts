import { Router } from 'express'
import usersController from '@controllers/users/index'
import passport from '../middlewares/passport'

const router = Router()

router.post('/register', usersController.createUser.bind(usersController))
router.post(
  '/login',
  passport.authenticate('jwt', { session: false }),
  usersController.singIn.bind(usersController)
)
// Adicione outras rotas de usuários conforme necessário

export default router
