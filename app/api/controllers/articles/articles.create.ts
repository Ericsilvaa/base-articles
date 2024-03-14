import ArticlesService from '@services/articles.service'
import { Request, Response } from 'express'

export class ArticlesController {
  protected articlesServices: ArticlesService

  constructor() {
    this.articlesServices = new ArticlesService()
  }

  async createUser(req: Request, res: Response) {
    const article = { ...req.body }
    // estou querendo criar um usuário
    const response = await this.articlesServices.createArticles(article)

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
