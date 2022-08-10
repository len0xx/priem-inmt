import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from './services/user.js'
import type { Response, NextFunction } from 'express'
import type { CustomRequest } from './types'

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