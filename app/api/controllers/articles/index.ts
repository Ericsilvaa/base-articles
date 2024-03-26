import { ArticlesServices } from '@services/articles.service'
import { ArticlesController } from './articles.controller'
import { ArticlesRepository } from '@repositories/articles.repository'
import { CategoriesRepository } from '@repositories/categories.repository'

const articlesRepository = new ArticlesRepository()
const categoriesRepository = new CategoriesRepository()
const articlesServices = new ArticlesServices(
  articlesRepository,
  categoriesRepository
)
const articlesController = new ArticlesController(articlesServices)

export default articlesController
