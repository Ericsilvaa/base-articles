import { Router } from 'express'
import statsController from '@controllers/stat/index'

const router = Router()

router
  .route('/')
  .get(statsController.getStats.bind(statsController))
  .post(statsController.createStat.bind(statsController))

export default router
