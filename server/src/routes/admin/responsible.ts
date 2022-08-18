import { Router } from 'express'
import { create } from '../../controllers/admin/responsible/create.js'
import { update } from '../../controllers/admin/responsible/update.js'
import { get, getAll } from '../../controllers/admin/responsible/get.js'
import { del } from '../../controllers/admin/responsible/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('text'), create)
router.patch('/:id', requireAuthorization('text'), update)
router.delete('/:id', requireAuthorization('text'), del)
router.get('/:id', get)
router.get('/', getAll)

export default router
