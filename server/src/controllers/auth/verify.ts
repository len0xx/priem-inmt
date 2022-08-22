import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { catchHTTPErrors, HTTPResponse } from '../../utilities.js'
import { HTTPStatus } from '../../types/enums.js'
import type { Request, Response } from 'express'

dotenv.config()

export const verify = catchHTTPErrors(async (req: Request, res: Response) => {
    const token: string = req.body.token

    if (!token)
        return new HTTPResponse(res, HTTPStatus.UNAUTHORIZED, 'Token is missing')

    const decode = jwt.verify(token, process.env.SECRET) as Record<string, string>

    if (decode.id)
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { id: decode.id, message: 'Verified successfully' })

    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Verification failed')
})
