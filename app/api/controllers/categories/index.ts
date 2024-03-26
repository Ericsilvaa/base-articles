import { CategoriesService } from '@services/categories.service'
import { CategoriesController } from './categories.controller'
import { CategoriesRepository } from '@repositories/categories.repository'

const categoriesRepository = new CategoriesRepository()
const categorriesService = new CategoriesService(categoriesRepository)
const categoriesController = new CategoriesController(categorriesService)

export default categoriesController
