import bcrypt from 'bcrypt'
import express from 'express'
import ERRORS from '../../../errors.js'
import { UserModel } from '../../models/user.js'
import type { Request, Response } from 'express'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        await user.save()

        res.json({
            ok: true,
            message: 'Created successfully'
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

export default router
