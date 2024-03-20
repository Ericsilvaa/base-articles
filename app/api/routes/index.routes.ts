import { Router } from 'express'

import users from './users.routes'
import auth from './auth.routes'
import articles from './articles.routes'
import categories from './categories.routes'
import stats from './stats.routes'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', (req, res) => {
  res.send('This is the root route!')
})

router.use('/auth', auth)
router.use('/profile', AuthMiddleware, users)
router.use('/categories', AuthMiddleware, categories)
router.use('/articles', AuthMiddleware, articles)
router.use('/stats', AuthMiddleware, stats)

export default router
