import UsersService from '@services/users.service'
import { Request, Response } from 'express'

export class CategoriesController {
  protected userServices: UsersService

  constructor() {
    this.userServices = new UsersService()
  }

  async createUser(req: Request, res: Response) {
    const user = { ...req.body }
    // estou querendo criar um usuário
    const response = await this.userServices.createUser(user)

    return res.status(response.code).json({ ...response })
  }

  // async updateUser(req: Request, res: Response) {
  //   const user = { ...req.body }
  //   user.id = req.params.id

  // realizar validações aqui
  // delete user.confirmPassword

  // estou querendo atualizar um usuário
  // const response = await this.userServices.(user)

  // return res.status(response.code).json({ ...response })
  // }
}
