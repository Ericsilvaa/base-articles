import { Router } from 'express'
import articlesController from '@controllers/articles/index'

const router = Router()

router.get(
  '/articles/:id',
  articlesController.createUser.bind(articlesController)
)
router.delete(
  '/articles/:id',
  articlesController.createUser.bind(articlesController)
)
router.get(
  '/articles/tree',
  articlesController.createUser.bind(articlesController)
)
router.get('/articles', articlesController.createUser.bind(articlesController))
router.post('/articles', articlesController.createUser.bind(articlesController))
// Adicione outras rotas de usuários conforme necessário

export default router
