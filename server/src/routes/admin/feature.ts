import { Router } from 'express'
import { create } from '../../controllers/admin/feature/create.js'
import { update } from '../../controllers/admin/feature/update.js'
import { read, readAll } from '../../controllers/admin/feature/read.js'
import { del } from '../../controllers/admin/feature/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), create)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)
router.get('/:id', read)
router.get('/', readAll)

export default router
