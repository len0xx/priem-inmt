import { Router } from 'express'
import { create } from '../../controllers/admin/programs/create.js'
import { script } from '../../controllers/admin/programs/script.js'
import { del } from '../../controllers/admin/programs/delete.js'
import { read, readAll } from '../../controllers/admin/programs/read.js'
import { update } from '../../controllers/admin/programs/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), create)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)
router.delete('/:id/?partner=:partner', requireAuthorization('json'), del)
router.post('/script', requireAuthorization('json'), script)
router.get('/:id', read)
router.get('/', readAll)

export default router
