// import userService from '../../services/user.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import type { Request, Response } from 'express'
import { HTTPStatus } from '../../types/enums.js'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // const token = await userService.login(email, password, req.ip)

        const cookies = {}
        // const cookies = {
        //     token: {
        //         value: token,
        //         options: { maxAge: 86400 * 1000 * 2, path: '/', httpOnly: true }
        //     }
        // }

        return new HTTPResponse(res, HTTPStatus.SUCCESS, '', cookies)
    }
    catch(err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}

export const logout = async (_: Request, res: Response) => {
    return new HTTPResponse( res, HTTPStatus.MOVED, '/', { token: { value: null } } )
}
