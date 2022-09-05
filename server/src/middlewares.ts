import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from './models/user.js'
import userService from './services/user.js'
import { HTTPResponse } from './utilities.js'
import { Role, HTTPStatus } from './types/enums.js'
import type { Response, NextFunction, Request } from 'express'
import type { CustomRequest } from './types'

dotenv.config()

const { NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

// Авторизовываем пользователя и сохраняем объект с его данными в req.user
export const authorize = async (req: CustomRequest, _: Response, next: NextFunction) => {
    if (req.cookies['token']) {
        const token = req.cookies['token']
        const decode = jwt.verify(token, process.env.SECRET) as Record<string, string>
        const user = await userService.getById(+decode.id)
        req.user = user
    }
    next()
}

// Если пользователь не авторизован – показываем соответствующее сообщение об ошибке или перенаправляем его на страницу входа
export const requireAuthorization = (response: 'redirect' | 'json' = 'json') => {
    const requiredRole = dev ? Role.User : Role.Admin
    const status = response == 'json' ? HTTPStatus.FORBIDDEN : HTTPStatus.MOVED
    const payload = response == 'json' ? 'У вас нет доступа к этому ресурсу' : '/admin-panel-auth/login'

    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (req.user.role !== requiredRole) 
            return new HTTPResponse(res, HTTPStatus.FORBIDDEN, { error: 'You are not allowed to access this page' })

        if (!(req.user && req.user instanceof User))
            return new HTTPResponse(res, status, payload)

        next()
    }
}

// Если пользователь авторизован – перенаправляем его на главную
export const requireUnauthorized = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.user)
    if (req.user && req.user instanceof User)
        return new HTTPResponse(res, HTTPStatus.MOVED, '/admin-panel')

    next()
}

// Перенаправляем пользователя с /admin-panel-auth/logout на /api/auth/logout
export const redirectLogout = (_: Request, res: Response) => new HTTPResponse(res, HTTPStatus.MOVED, '/api/auth/logout')
