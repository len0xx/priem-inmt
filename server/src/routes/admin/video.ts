import { Router } from 'express'
import { create } from '../../controllers/admin/documents/create.js'
import { del } from '../../controllers/admin/documents/delete.js'
import { read, readAll } from '../../controllers/admin/documents/read.js'
import { requireAuthorization } from '../../middlewares.js'
import { uploadVideo } from '../../multer.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', requireAuthorization('json'), uploadVideo.single('video'), create)
router.delete('/:id', requireAuthorization('json'), del)
router.get('/:id', read)
router.get('/', readAll)

export default router
