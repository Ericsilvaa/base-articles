import { Router } from 'express'
import categoriesController from '@controllers/categories/index'

const router = Router()

router.get(
  '/',
  categoriesController.getAllCategories.bind(categoriesController)
)

router.get(
  '/cat/tree',
  categoriesController.getCategoryTree.bind(categoriesController)
)

router.post(
  '/create',
  categoriesController.createCategory.bind(categoriesController)
)

router.delete(
  '/delete/:id',
  categoriesController.deleteCategory.bind(categoriesController)
)
router.put(
  '/update/:id',
  categoriesController.updateCategory.bind(categoriesController)
)
router.get(
  '/:id',
  categoriesController.getCategoryById.bind(categoriesController)
)

// Adicione outras rotas de usuários conforme necessário

export default router
