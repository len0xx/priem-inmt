import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from './services/user.js'
import type { Response, NextFunction } from 'express'
import type { CustomRequest } from './types'
import { HTTPResponse } from './utilities.js'
import { HTTPStatus } from './types/enums.js'

dotenv.config()

// Авторизовываем пользователя и сохраняем объект с его данными в req.user
export const authenticate = async (req: CustomRequest, _: Response, next: NextFunction) => {
    if (req.cookies['token']) {
        const token = req.cookies['token']
        const decode = jwt.verify(token, process.env.SECRET) as Record<string, string>
        const user = await userService.get(+decode.id)
        req.user = user
    }
    next()
}

// Если пользователь не авторизован – перенаправляем его на страницу входа
export const requireAuthorized = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!(req.user && req.user.email))
        return new HTTPResponse(res, HTTPStatus.MOVED, '/admin-panel-auth/login')

    next()
}

// Если пользователь авторизован – перенаправляем его на главную
export const requireUnauthorized = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.email)
        return new HTTPResponse(res, HTTPStatus.MOVED, '/admin-panel')

    next()
}

// Перенаправляем пользователя с /admin-panel-auth/logout на /api/auth/logout
export const redirectLogout = async (_: CustomRequest, res: Response) => new HTTPResponse(res, HTTPStatus.MOVED, '/api/auth/logout')
