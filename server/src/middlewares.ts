// import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { getPublicUserModel, UserModel } from './models/user.js'
// import type { Response, NextFunction } from 'express'
// import type { CustomRequest } from './types'

dotenv.config()

// Авторизовываем пользователя и сохраняем объект с его данными в req.user
// export const authenticate = async (req: CustomRequest, _: Response, next: NextFunction) => {
//     if (req.cookies['token']) {
//         const token = req.cookies['token']
//         const decode = jwt.verify(token, process.env.SECRET) as Record<string, string>
//         const userObject = await UserModel.findOne({ _id: decode.id })
//         const user = getPublicUserModel(userObject)
//         req.user = user
//     }
//     next()
// }