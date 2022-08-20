import { Router } from 'express'
import { createMaster, createBachelor } from '../../controllers/admin/question/create.js'
import { update } from '../../controllers/admin/question/update.js'
import { get, getAll } from '../../controllers/admin/question/get.js'
import { findBachelor, findMaster } from '../../controllers/admin/question/find.js'
import { del } from '../../controllers/admin/question/delete.js'
import { requireAuthorization } from '../../middlewares.js'

const router = Router() // eslint-disable-line new-cap

router.post('/master', requireAuthorization('json'), createMaster)
router.post('/bachelor', requireAuthorization('json'), createBachelor)
router.patch('/:id', requireAuthorization('json'), update)
router.delete('/:id', requireAuthorization('json'), del)
router.get('/:id', get)
router.get('/', getAll)
router.get('/bachelor/find', findBachelor)
router.get('/master/find', findMaster)

export default router
