import userService from '../../services/user.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import type { Request, Response } from 'express'
import { HTTPStatus } from '../../types/enums.js'
import type { UserI } from '../../models/user.js'

export const signup = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body
        const user: UserI = {
            firstName: firstname,
            lastName: lastname,
            email,
            password,
            lastLoginDate: new Date(),
            lastLoginIP: req.ip
        }

        await userService.signup(user)
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Пользователь успешно зарегистрирован')
    }
    catch(err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
