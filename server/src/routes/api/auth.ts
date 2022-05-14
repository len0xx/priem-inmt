import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import ERRORS from '../../../errors.js'
import { UserModel } from '../../models/user.js'
import type { Request, Response } from 'express'
import type { UserObject } from '../../models/user'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
    try {
        const user: UserObject | undefined = await UserModel.findOne({
            email: req.body.email
        })

        if (!user) {
            res.json({
                ok: false,
                error: 'The user with such email doesn\'t exist',
                errorCode: ERRORS.NOT_FOUND
            })
            return
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password.toString(),
            user.password
        )

        if (!passwordIsValid) {
            res.json({
                ok: false,
                error: 'Invalid password',
                errorCode: ERRORS.INVALID_DATA
            })
            return
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: 86400 * 30 }
        )

        res.cookie('token', token, { maxAge: 86400 * 1000 * 30, path: '/', httpOnly: true })
        res.json({
            ok: true
        })
    }
    catch(err) {
        console.error(err)
        res.json({
            ok: false,
            error: 'Unexpected error',
            errorCode: ERRORS.UNKNOWN_ERROR
        })
    }
})

router.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie('token')

    res.redirect('/')
})

export default router
