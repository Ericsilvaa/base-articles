import { AuthServices } from '@services/auth.service'
import { AuthController } from './auth.controller'

const usersServices = new AuthServices()
const usersController = new AuthController(usersServices)

export default usersController
