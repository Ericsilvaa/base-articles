import { Router } from 'express'
import statusController from '@controllers/status'

const router = Router()
// Status endpoint
const statusControllerInstance = statusController()
console.log('🚀 ~ statusControllerInstance:', statusControllerInstance)

router.get('/status')

// Users endpoints

export default router
