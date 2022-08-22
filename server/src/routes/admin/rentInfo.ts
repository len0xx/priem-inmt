import { Router } from 'express'
import { read } from '../../controllers/admin/rentInfo/read.js'
import { update } from '../../controllers/admin/rentInfo/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.get('/', read)
router.post('/', requireAuthorization('json'), update)

export default router