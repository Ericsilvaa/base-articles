import { UsersServices } from '@services/users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from '@repositories/users.repository'

const usersRepository = new UsersRepository()
const usersServices = new UsersServices(usersRepository)
const usersController = new UsersController(usersServices)

export default usersController
