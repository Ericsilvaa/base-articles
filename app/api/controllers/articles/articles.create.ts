import ArticlesService from '@services/articles.service'
import { Request, Response } from 'express'

export class ArticlesController {
  protected articlesServices: ArticlesService

  constructor() {
    this.articlesServices = new ArticlesService()
  }

  async createArticle(req: Request, res: Response) {
    const article = { ...req.body }
    const response = await this.articlesServices.createArticles(article)

    return res.status(response.code).json({ ...response })
  }

  async getAllArticles(req: Request, res: Response) {
    const query = req.query

    const response = await this.articlesServices.getArticles(query)

    return res.status(response.code).json({ ...response })
  }

  async getArticlesById(req: Request, res: Response) {
    const response = await this.articlesServices.getArticlesById(req.params.id)

    return res.status(response.code).json({ ...response })
  }

  async deleteArticle(req: Request, res: Response) {
    const response = await this.articlesServices.removeArticles(req.params.id)

    return res.status(response.code).json({ ...response })
  }

  async updateArticle(req: Request, res: Response) {
    const article = { ...req.body }
    article.id = req.params.id

    const response = await this.articlesServices.updateArticles(article)

    return res.status(response.code).json({ ...response })
  }

  async getArticlesByCategory(req: Request, res: Response) {
    const { category_id: id } = req.params
    const query = req.query

    const response = await this.articlesServices.getArticleByCategory({
      id,
      ...query,
    })

    return res.status(response.code).json({ ...response })
  }
}
