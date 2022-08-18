import { Router } from 'express'
import { readAll } from '../../controllers/admin/contactInfo/read.js'
import { update } from '../../controllers/admin/contactInfo/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.get('/contacts', readAll)
router.post('/contacts', requireAuthorization('json'), update)

export default router