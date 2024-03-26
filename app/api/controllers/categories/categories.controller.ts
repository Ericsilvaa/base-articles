import { CategoriesService } from '@services/categories.service'
import { Request, Response } from 'express'

export class CategoriesController {
  private categoryService: CategoriesService

  constructor(categoryService: CategoriesService) {
    this.categoryService = categoryService
  }

  async createCategory(req: Request, res: Response) {
    const category = { ...req.body, authorId: req.user.id }

    if (category.id) {
      return res.status(400).json({
        message: 'Não é possível criar uma categoria com um id específico',
      })
    }

    const response = await this.categoryService.createCategory(category)

    return res.status(response.code).json({ ...response })
  }

  async getAllCategories(req: Request, res: Response) {
    const { id } = req.user

    const response = await this.categoryService.getCategories(id)

    return res.status(response.code).json({ ...response })
  }

  async getCategoryTree(req: Request, res: Response) {
    const { id } = req.user

    const response = await this.categoryService.getTreeCategories(id)

    return res.status(response.code).json({ ...response })
  }

  async getCategoryById(req: Request, res: Response) {
    const category: { id: string; authorId: string } = {
      id: req.params.id,
      authorId: req.user.id,
    }

    const response = await this.categoryService.getCategoryById(category)

    return res.status(response.code).json({ ...response })
  }

  async deleteCategory(req: Request, res: Response) {
    const category: { id: string; authorId: string } = {
      id: req.params.id,
      authorId: req.user.id,
    }

    const response = await this.categoryService.removeCategory(category)

    return res.status(response.code).json({ ...response })
  }

  async updateCategory(req: Request, res: Response) {
    const category = { ...req.body, authorId: req.user.id, id: req.params.id }

    const response = await this.categoryService.updateCategory(category)

    return res.status(response.code).json({ ...response })
  }
}
