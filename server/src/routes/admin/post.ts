import { Router } from 'express'
import { create } from '../../controllers/admin/post/create.js'
import { del } from '../../controllers/admin/post/delete.js'
import { readAll, read } from '../../controllers/admin/post/read.js'
import { update } from '../../controllers/admin/post/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), create)
router.get('/', readAll)
router.get('/:id', read)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)

export default router
