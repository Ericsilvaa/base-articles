import { AuthServices } from '@services/auth.service'
import { Request, Response } from 'express'

export class AuthController {
  private authServices: AuthServices

  constructor(authServices: AuthServices) {
    this.authServices = authServices
  }

  async registerUser(req: Request, res: Response) {
    const { password_confirm, ...body } = req.body

    if (body.password !== password_confirm) {
      return res.status(400).send({ message: 'As Senhas  Precisam ser iguais' })
    }

    // estou querendo criar um usuário
    const response = await this.authServices.registerUser(body)

    return res.status(response.code).json({ ...response })
  }

  async singIn(req: Request, res: Response) {
    const user = { ...req.body }

    // estou querendo criar um usuário
    const response = await this.authServices.singIn(user)

    return res
      .cookie('jwt', response.data.token, {
        httpOnly: true,
        maxAge: response.data.exp,
      })
      .status(response.code)
      .json({ ...response })

    // async updateUser(req: Request, res: Response) {
    //   const user = { ...req.body }
    //   user.id = req.params.id

    //   const response = await this.authServices.updateUser(user)

    //   return res.status(response.code).json({ ...response })
    // }
  }

  async logout(req: Request, res: Response) {
    return res.cookie('jwt', '', { maxAge: 0 }).send()
  }
}
