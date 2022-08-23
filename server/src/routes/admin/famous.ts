import { Router } from 'express'
import { create } from '../../controllers/admin/famous/create.js'
import { update } from '../../controllers/admin/famous/update.js'
import { get, getAll } from '../../controllers/admin/famous/get.js'
import { del } from '../../controllers/admin/famous/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), create)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)
router.get('/:id', get)
router.get('/', getAll)

export default router
