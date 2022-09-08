import { Router } from 'express'
import { create } from '../../controllers/admin/settlement/create.js'
import { update } from '../../controllers/admin/settlement/update.js'
import { read } from '../../controllers/admin/settlement/read.js'
import { del } from '../../controllers/admin/settlement/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), create)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)
router.get('/:id', read)

export default router
