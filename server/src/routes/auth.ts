import { Router } from 'express'
import { verify } from '../controllers/auth/verify.js'

const router = Router() // eslint-disable-line new-cap

router.post('/verify', verify)

export default router
