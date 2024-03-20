import { UsersServices } from '@services/users.service'
import { UsersController } from './users.controller'

const usersServices = new UsersServices()
const usersController = new UsersController(usersServices)

export default usersController
