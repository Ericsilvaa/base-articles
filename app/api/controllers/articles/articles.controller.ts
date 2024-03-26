import { ArticlesServices } from '@services/articles.service'
import { Request, Response } from 'express'

type FileMulter = Array<
  Express.Multer.File & { location: string; key: string; url: string }
>

export class ArticlesController {
  private articlesServices: ArticlesServices

  constructor(articleService: ArticlesServices) {
    this.articlesServices = articleService
  }

  async createArticle(req: Request, res: Response) {
    const articles = { ...req.body, authorId: req.user.id }

    const file = [{ ...req.file }] as FileMulter

    if (!file[0].url)
      file[0].url = `http://localhost:3000/files/${file[0].filename}`

    const response = await this.articlesServices.createArticles({
      file,
      articles,
    })

    return res.status(response.code).json({ ...response })
  }

  async getAllArticles(req: Request, res: Response) {
    const query = { ...req.query, authorId: req.user.id }

    const response = await this.articlesServices.getArticles(query)

    return res.status(response.code).json({ ...response })
  }

  async getArticlesById(req: Request, res: Response) {
    const article = { id: req.params.id, authorId: req.user.id }

    const response = await this.articlesServices.getArticlesById(article)

    return res.status(response.code).json({ ...response })
  }

  async deleteArticle(req: Request, res: Response) {
    const article = { id: req.params.id, authorId: req.user.id }

    const response = await this.articlesServices.removeArticles(article)

    return res.status(response.code).json({ ...response })
  }

  async updateArticle(req: Request, res: Response) {
    const article = { ...req.body, id: req.params.id, authorId: req.user.id }

    const response = await this.articlesServices.updateArticles(article)

    return res.status(response.code).json({ ...response })
  }

  async getArticlesByCategory(req: Request, res: Response) {
    const query = {
      ...req.query,
      authorId: req.user.id,
      id: req.params.category_id,
    }

    const response = await this.articlesServices.getArticleByCategory(query)

    return res.status(response.code).json({ ...response })
  }
}
