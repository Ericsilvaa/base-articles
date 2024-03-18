import { Router } from 'express'
import categoriesController from '@controllers/categories/index'
// import AuthPassport from '../middlewares/passport'

const router = Router()

// router.all('/', AuthPassport.authJwt().authenticate())

router.get(
  '/tree',
  categoriesController.getCategoryTree.bind(categoriesController)
)

router.get(
  '/:id',
  categoriesController.getCategoryById.bind(categoriesController)
)
router.delete(
  '/delete/:id',
  categoriesController.deleteCategory.bind(categoriesController)
)
router.put(
  '/update/:id',
  categoriesController.updateCategory.bind(categoriesController)
)

router
  .route('/')
  .get(categoriesController.getAllCategories.bind(categoriesController))
  .post(categoriesController.createCategory.bind(categoriesController))

export default router
