import { Router } from 'express'
import { create } from '../../controllers/admin/post/create.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('text'), create)

export default router
