import { Router } from 'express'
import userService from '../services/user.js'
import type { Request, Response } from 'express'

const router = Router() /* eslint-disable-line */

router.get('/', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.query

    const newUser = {
        firstName: firstName ? firstName.toString() : 'Ivan',
        lastName: lastName ? lastName.toString() : 'Petrov',
        email: email ? email.toString() : 'email@example.com',
        password: password ? password.toString() : 'ivanpetrowpasswd',
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
            error: e instanceof Error ? e.message : e.toString()
        })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id

    try {
        const user = await userService.get(id)

        res.status(200).json({
            ok: true,
            user
        })
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            error: e instanceof Error ? e.message : e.toString()
        })
    }
})

export default router
