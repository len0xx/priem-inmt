import userService from '../../services/user.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import type { Request, Response } from 'express'
import { HTTPStatus } from '../../types/enums.js'

export const signup = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body
        await userService.signup(firstname, lastname, email, password)
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Пользователь успешно зарегистрирован')
    }
    catch(err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
