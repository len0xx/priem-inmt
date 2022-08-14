import { Router } from 'express'
import { create } from '../controllers/program/create.js'
import { del } from '../controllers/program/delete.js'
import { get, getAll } from '../controllers/program/get.js'
import { update } from '../controllers/program/update.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', del)
router.get('/:id', get)
router.get('/', getAll)

export default router
