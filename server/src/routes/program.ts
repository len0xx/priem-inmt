import { Router } from 'express'
import { create } from '../controllers/admin/programs/create.js'
import { del } from '../controllers/admin/programs/delete.js'
import { get, getAll } from '../controllers/admin/programs/get.js'
import { update } from '../controllers/admin/programs/update.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', del)
router.get('/:id', get)
router.get('/', getAll)

export default router
