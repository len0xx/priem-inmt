import { Router } from 'express'
import userService from '../services/user.js'
import type { Request, Response } from 'express'

const router = Router() /* eslint-disable-line */

router.get('/', (_: Request, res: Response) => {
    userService.create({ firstName: 'Prokhor', lastName: 'Minin' })
    res.status(200).json({
        ok: true,
        done: true
    })
})

export default router
