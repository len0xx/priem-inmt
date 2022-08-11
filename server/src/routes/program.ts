import { Router } from 'express'
import { create } from '../controllers/program/create.js'

const router = Router() // eslint-disable-line new-cap

router.post('/create', create)

export default router
