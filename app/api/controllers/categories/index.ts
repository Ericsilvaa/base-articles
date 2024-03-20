import { CategoriesService } from '@services/categories.service'
import { CategoriesController } from './categories.controller'

const categorriesService = new CategoriesService()
const categoriesController = new CategoriesController(categorriesService)

export default categoriesController
