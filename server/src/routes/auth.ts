import { Router } from 'express'
import { verify } from '../controllers/auth/verify.js'
import { login, logout } from '../controllers/auth/login.js'
import { signup } from '../controllers/auth/signup.js'
import { getInfo } from '../controllers/auth/user.js'

const router = Router() // eslint-disable-line new-cap

router.post('/verify', verify)
router.post('/login', login)
router.get('/logout', logout)
router.post('/signup', signup)
router.post('/user', getInfo)

export default router
