import { Router } from 'express'
import { create } from '../../controllers/admin/partner/create.js'
import { update } from '../../controllers/admin/partner/update.js'
import { read, readAll } from '../../controllers/admin/partner/read.js'
import { del } from '../../controllers/admin/partner/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), create)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)
router.get('/:id', read)
router.get('/', readAll)

export default router
