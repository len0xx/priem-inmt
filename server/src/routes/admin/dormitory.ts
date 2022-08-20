import { Router } from 'express'
import { create } from '../../controllers/admin/dormitory/create.js'
import { readAll, readOne } from '../../controllers/admin/dormitory/read.js'
import { update } from '../../controllers/admin/dormitory/update.js'
import { del } from '../../controllers/admin/dormitory/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.post('/', requireAuthorization('json'), create)

router.get('/', readAll)

router.get('/:id', readOne)

router.patch('/:id', requireAuthorization('json'), update)

router.delete('/:id', requireAuthorization('json'), del)

export default router