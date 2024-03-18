import { Router } from 'express'
import articlesController from '@controllers/articles/index'

const router = Router()

router.get(
  '/category/:category_id',
  articlesController.getArticlesByCategory.bind(articlesController)
)
router.get('/:id', articlesController.getArticlesById.bind(articlesController))
router.delete(
  '/delete/:id',
  articlesController.deleteArticle.bind(articlesController)
)
router.put(
  '/update/:id',
  articlesController.updateArticle.bind(articlesController)
)

router
  .route('/')
  .get(articlesController.getAllArticles.bind(articlesController))
  .post(articlesController.createArticle.bind(articlesController))

export default router
