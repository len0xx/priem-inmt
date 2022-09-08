import { Router } from 'express'
import { create } from '../../controllers/admin/carousel/create.js'
import { update } from '../../controllers/admin/carousel/update.js'
import { read, readAll } from '../../controllers/admin/carousel/read.js'
import { del } from '../../controllers/admin/carousel/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), create)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)
router.get('/:id', read)
router.get('/', readAll)

export default router
