import { Router } from 'express'
import { read } from '../../controllers/admin/contactInfo/read.js'
import { update } from '../../controllers/admin/contactInfo/update.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() /* eslint-disable-line */

router.get('/contacts', read)
router.post('/contacts', requireAuthorization('json'), update)

export default router