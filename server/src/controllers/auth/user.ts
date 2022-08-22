import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import userService from '../../services/user.js'
import { catchHTTPErrors, HTTPResponse } from '../../utilities.js'
import { HTTPStatus } from '../../types/enums.js'
import type { Request, Response } from 'express'

dotenv.config()

export const getInfo = catchHTTPErrors(async (req: Request, res: Response) => {
    const token = req.body.token
    const id = req.body.id
    const API_KEY = req.headers['x-api-key']

    if (!(token && id && API_KEY && (API_KEY === process.env.API_KEY))) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Некорректный запрос: поля "token", "id" и API_KEY являются обязательными')
    }

    const decode = jwt.verify(token, process.env.SECRET) as Record<string, string>

    if (+id !== +decode.id) {
        return new HTTPResponse(res, HTTPStatus.UNAUTHORIZED, 'Некорректный id')
    }

    const user = await userService.getById(+decode.id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { user })
})
