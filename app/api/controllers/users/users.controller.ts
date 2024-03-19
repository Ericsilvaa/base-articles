import UsersService from '@services/users.service'
import { Request, Response } from 'express'

type FileMulter = Express.Multer.File & {
  location: string
  key: string
  url: string
}

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

  async updateUser(req: Request, res: Response) {
    const user = { ...req.body }
    user.id = req.params.id

    const response = await this.userServices.updateUser(user)

    return res.status(response.code).json({ ...response })
  }

  async updateProfilePhoto(req: Request, res: Response) {
    const { id } = req.params
    const photo = req.file as unknown as FileMulter

    if (!photo.url) photo.url = `http://localhost:3000/files/${photo.filename}`

    const response = await this.userServices.updateProfilePhoto(id, photo)

    return res.status(response.code).json({ ...response })
  }
}
