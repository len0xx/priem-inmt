import { Router } from 'express'
import { create } from '../../controllers/admin/contactInfo/create.js'
import { read } from '../../controllers/admin/contactInfo/read.js'
import { update } from '../../controllers/admin/contactInfo/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.get('/', read)
router.post('/', requireAuthorization('json'), create)
router.patch('/', requireAuthorization('json'), update)

export default router