import { Router } from 'express'
import { readAll } from '../../controllers/admin/contactInfo/read.js'
import { update } from '../../controllers/admin/contactInfo/update.js'

const router = Router() /* eslint-disable-line */

router.post('/contacts', update)
router.get('/contacts', readAll)

export default router