import { CategoriesService } from '@services/categories.service'
import { Request, Response } from 'express'

export class CategoriesController {
  protected categoryService: CategoriesService

  constructor(categoryService: CategoriesService) {
    this.categoryService = categoryService
  }

  async createCategory(req: Request, res: Response) {
    const category = { ...req.body }

    if (category.id) {
      return res.status(400).json({
        message: 'Não é possível criar uma categoria com um id específico',
      })
    }

    const response = await this.categoryService.createCategory(category)

    return res.status(response.code).json({ ...response })
  }

  async getAllCategories(req: Request, res: Response) {
    const response = await this.categoryService.getCategories()

    return res.status(response.code).json({ ...response })
  }

  async getCategoryTree(req: Request, res: Response) {
    const response = await this.categoryService.getTreeCategories()

    return res.status(response.code).json({ ...response })
  }

  async getCategoryById(req: Request, res: Response) {
    const response = await this.categoryService.getCategoryById(req.params.id)

    return res.status(response.code).json({ ...response })
  }

  async deleteCategory(req: Request, res: Response) {
    const response = await this.categoryService.removeCategory(req.params.id)

    return res.status(response.code).json({ ...response })
  }

  async updateCategory(req: Request, res: Response) {
    const category = { ...req.body }
    category.id = req.params.id

    const response = await this.categoryService.updateCategory(category)

    return res.status(response.code).json({ ...response })
  }
}
