import { AuthServices } from '@services/auth.service'
import { AuthController } from './auth.controller'
import { UsersRepository } from '@repositories/users.repository'

const statsRepository = new UsersRepository()
const usersServices = new AuthServices(statsRepository)
const usersController = new AuthController(usersServices)

export default usersController
