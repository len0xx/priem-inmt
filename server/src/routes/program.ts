import { Router } from 'express'
import { create } from '../controllers/program/create.js'
import { edit } from '../controllers/program/edit.js'

const router = Router() // eslint-disable-line new-cap

router.post('/create', create)

router.get('/edit/:id', edit)

export default router
