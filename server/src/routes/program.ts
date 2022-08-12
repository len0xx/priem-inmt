import { Router } from 'express'
import { create } from '../controllers/program/create.js'
import { del } from '../controllers/program/delete.js'
import { get } from '../controllers/program/get.js'
import { update } from '../controllers/program/update.js'

const router = Router() // eslint-disable-line new-cap

router.post('/create', create)
router.post('/delete/:id', del)
router.get('/get/:id', get)
router.post('/update/:id', update)

export default router
