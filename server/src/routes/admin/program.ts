import { Router } from 'express'
import { create } from '../../controllers/admin/programs/create.js'
import { script } from '../../controllers/admin/programs/script.js'
import { del } from '../../controllers/admin/programs/delete.js'
import { get, getAll } from '../../controllers/admin/programs/get.js'
import { update } from '../../controllers/admin/programs/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/script', requireAuthorization('text'), script)

router.post('/', requireAuthorization('text'), create)
router.patch('/:id', requireAuthorization('text'), update)
router.delete('/:id', requireAuthorization('text'), del)
router.get('/:id', get)
router.get('/', getAll)

export default router
