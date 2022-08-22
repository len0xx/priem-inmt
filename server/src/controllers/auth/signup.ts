import userService from '../../services/user.js'
import { catchHTTPErrors, HTTPResponse } from '../../utilities.js'
import { HTTPStatus } from '../../types/enums.js'
import type { Request, Response } from 'express'
import type { UserI } from '../../models/user.js'

export const signup = catchHTTPErrors(async (req: Request, res: Response) => {
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
})
