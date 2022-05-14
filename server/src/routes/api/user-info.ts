import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import ERRORS from '../../../errors.js'
import { UserModel, getPublicUserModel } from '../../models/user.js'
import type { Request, Response } from 'express'

dotenv.config()

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const token = req.body.token
        const id = req.body.id

        const api_key = req.headers['x-api-key']

        if (!(token && id && (api_key === process.env.API_KEY))) {
            res.status(403).json({
                ok: false,
                error: 'Invalid data',
                errorCode: ERRORS.INVALID_DATA
            })
            return
        }

        const decode = jwt.verify(token, process.env.SECRET) as { id: string }

        if (id !== decode.id) {
            res.json({
                ok: false,
                error: 'Invalid token'
            })
            return
        }

        const userObject = await UserModel.findOne({ _id: decode.id })
        const user = getPublicUserModel(userObject)

        res.json({
            ok: true,
            user
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
