import { Router } from 'express'
import articlesController from '@controllers/articles/index'

const router = Router()

router.get('/:id', articlesController.getArticlesById.bind(articlesController))
router.delete(
  '/delete/:id',
  articlesController.deleteArticle.bind(articlesController)
)
router.get('/', articlesController.getAllArticles.bind(articlesController))
router.post('/', articlesController.createArticle.bind(articlesController))
router.put(
  '/update/:id',
  articlesController.updateArticle.bind(articlesController)
)

export default router
