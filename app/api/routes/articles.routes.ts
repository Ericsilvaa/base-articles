import { Router } from 'express'
import articlesController from '@controllers/articles/index'
import { Upload } from '@config/multer'

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
  articlesController.createArticle.bind(articlesController)
)

export default router
