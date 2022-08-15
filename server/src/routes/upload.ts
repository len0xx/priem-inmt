import { Router } from 'express'
import { create } from '../controllers/upload.js'
import { uploadImage } from '../multer.js'

const router = Router() // eslint-disable-line new-cap

router.post('/', uploadImage.single('logo'), create)

export default router
