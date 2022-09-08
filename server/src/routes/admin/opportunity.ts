import { Router } from 'express'
import { create } from '../../controllers/admin/opportunity/create.js'
import { readAll, readOne } from '../../controllers/admin/opportunity/read.js'
import { update } from '../../controllers/admin/opportunity/update.js'
import { del } from '../../controllers/admin/opportunity/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.post('/', requireAuthorization('json'), create)
router.get('/', readAll)
router.get('/:id', readOne)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)

export default router