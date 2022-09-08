import { Router } from 'express'
import { readAll } from '../../controllers/admin/textinfo/read.js'
import { update } from '../../controllers/admin/textinfo/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.get('/', readAll)
router.patch('/', requireAuthorization('json'), update)

export default router