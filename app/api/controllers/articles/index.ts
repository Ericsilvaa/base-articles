import { ArticlesServices } from '@services/articles.service'
import { ArticlesController } from './articles.controller'

const articlesServices = new ArticlesServices()
const articlesController = new ArticlesController(articlesServices)

export default articlesController
