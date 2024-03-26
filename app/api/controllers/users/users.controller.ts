import { UsersServices } from '@services/users.service'
import { Request, Response } from 'express'

type FileMulter = Express.Multer.File & {
  location: string
  key: string
  url: string
}

export class UsersController {
  private userServices: UsersServices

  constructor(userServices: UsersServices) {
    this.userServices = userServices
  }

  async getUserCurrent(req: Request, res: Response) {
    const { id } = req.user
    const response = await this.userServices.findUserById(id)

    return res.status(response.code).json({ ...response })
  }

  async updateUser(req: Request, res: Response) {
    const user = { ...req.body }
    user.id = req.user.id

    const response = await this.userServices.updateUser(user)

    return res.status(response.code).json({ ...response })
  }

  async updateProfilePhoto(req: Request, res: Response) {
    const { id } = req.user
    const photo = req.file as FileMulter

    if (!photo.url) photo.url = `http://localhost:3000/files/${photo.filename}`

    const response = await this.userServices.updateProfilePhoto(id, photo)

    return res.status(response.code).json({ ...response })
  }
}
