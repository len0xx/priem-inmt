import { Router } from 'express'
import userService from '../services/user.js'
import type { Request, Response } from 'express'
import { getErrorDetails } from '../utilities.js'

const router = Router() /* eslint-disable-line */

router.get('/', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.query

    const newUser = {
        firstName: firstName ? firstName.toString() : undefined,
        lastName: lastName ? lastName.toString() : undefined,
        email: email ? email.toString() : undefined,
        password: password ? password.toString() : undefined
    }

    try {
        await userService.create(newUser)

        res.status(200).json({
            ok: true,
            message: 'New user has been created!'
        })
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            error: getErrorDetails(e).message
        })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id

    try {
        const user = await userService.get(id)

        if (user) {
            res.status(200).json({
                ok: true,
                user
            })
        }
        else {
            res.status(404).json({
                ok: false,
                error: 'User was not found'
            })
        }
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            error: getErrorDetails(e).message
        })
    }
})

export default router
