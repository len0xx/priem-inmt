import { Router } from 'express'
import { update } from '../../controllers/contactInfo/update.js'

const router = Router() /* eslint-disable-line */

router.post('/contacts', update)

export default router
