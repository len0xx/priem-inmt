import { Router } from 'express'
import { readAll } from '../../controllers/admin/text/read.js'
import { update } from '../../controllers/admin/text/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.get('/', readAll)

router.patch('/', requireAuthorization('json'), update)

export default router