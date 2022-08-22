import userService from '../../services/user.js'
import { catchHTTPErrors, HTTPResponse } from '../../utilities.js'
import jwt from 'jsonwebtoken'
import { HTTPStatus } from '../../types/enums.js'
import type { Request, Response } from 'express'

export const login = catchHTTPErrors(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const userId = await userService.login(email, password, req.ip)

    const token = jwt.sign(
        {
            id: userId,
            ip: req.ip
        },
        process.env.SECRET,
        { expiresIn: 86400 * 2 }
    )

    const cookies = {
        token: {
            value: token,
            options: { maxAge: 86400 * 1000 * 2, path: '/', httpOnly: true }
        }
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, '', cookies)
})

export const logout = async (_: Request, res: Response) => {
    return new HTTPResponse( res, HTTPStatus.MOVED, '/', { token: { value: null } } )
}
