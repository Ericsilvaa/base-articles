import UsersService from '@services/users.service'
import { Request, Response } from 'express'

export class UsersController {
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

  async singIn(req: Request, res: Response) {
    const user = { ...req.body }
    if (!user.email || !user.password) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: 'Email e senha são obrigatórios',
      })
    }

    // estou querendo criar um usuário
    const response = await this.userServices.singIn(user)

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
