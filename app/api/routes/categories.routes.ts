import { Router } from 'express'
import categoriesController from '@controllers/categories/index'

const router = Router()

router.get('/:id', categoriesController.createUser.bind(categoriesController))
router.delete(
  '/:id',
  categoriesController.createUser.bind(categoriesController)
)
router.get('/tree', categoriesController.createUser.bind(categoriesController))
router.get('/', categoriesController.createUser.bind(categoriesController))
router.post('/', categoriesController.createUser.bind(categoriesController))
// Adicione outras rotas de usuários conforme necessário

export default router
