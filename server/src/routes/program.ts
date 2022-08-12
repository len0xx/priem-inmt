import { Router } from 'express'
import { create } from '../controllers/program/create.js'
import { remove } from '../controllers/program/remove.js'
import { get } from '../controllers/program/get.js'
import { edit } from '../controllers/program/edit.js'

const router = Router() // eslint-disable-line new-cap

router.post('/create', create)
router.post('/remove/:id', remove)
router.get('/get/:id', get)
router.post('/edit/:id', edit)

export default router
