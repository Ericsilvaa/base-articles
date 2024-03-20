import { Router } from 'express'

import users from './users.routes'
import auth from './auth.routes'
import articles from './articles.routes'
import categories from './categories.routes'
import stats from './stats.routes'

const router = Router()

router.get('/', (req, res) => {
  res.send('This is the root route!')
})

router.use('/users', users)
router.use('/auth', auth)
router.use('/categories', categories)
router.use('/articles', articles)
router.use('/stats', stats)

export default router
