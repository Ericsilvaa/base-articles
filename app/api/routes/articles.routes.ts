import { Router } from 'express'
import { Upload } from '@config/multer'
import articlesController from '@controllers/articles/index'
import { createArticleValidation } from '../validations/articles'

const router = Router()
const up = Upload.uploadMulter()
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

router.get('/', articlesController.getAllArticles.bind(articlesController))
router.post(
  '/',
  up.single('articles_image'),
  createArticleValidation,
  articlesController.createArticle.bind(articlesController)
)

export default router
