import User, { UserI } from '../models/user.js'
import { HTTPError, validatePassword } from '../utilities.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import type { FindOptions, InferAttributes } from 'sequelize'

dotenv.config()

const dev = process.env.NODE_ENV == 'development'

class UserService {
    model: typeof User

    constructor() {
        this.model = User
    }

    async get(id: number, fetchPassword = false) {
        // TODO: Hide the password
        return await this.model.findByPk(id)
    }

    async getByQuery(where: FindOptions<InferAttributes<User>>, fetchPassword = false) {
        // TODO: Hide the password
        const result = await this.model.findAll(where)
        return result
    }

    async getAll() {
        return (await this.model.findAll())
    }

    async create(user: UserI) {
        return (await this.model.create(user))
    }

    async login(email: string, password: string, ip: string) {
        const results = await this.getByQuery({ where: { email } }, true)
        const user = (results[0]) as User
        if (!user) throw new HTTPError(404, 'Пользователь с таким Email не найден')

        const passwordComparison = await bcrypt.compare(password, user.password)
        if (!passwordComparison) throw new HTTPError(400, 'Неверный пароль')

        if (dev) console.log(user)

        const token = jwt.sign(
            {
                id: user.id,
                ip: ip
            },
            process.env.SECRET,
            { expiresIn: 86400 * 2 }
        )
    
        return token
    }

    async signup(user: UserI) {
        if (!user.email) throw new HTTPError(400, 'Email является обязательным для заполнения')
        if (!user.password) throw new HTTPError(400, 'Пароль является обязательным для заполнения')
        if (!validatePassword(user.password)) throw new HTTPError(400, 'Пароль должен иметь длину от 6 до 30 символов и содержать в себе как минимум по одной строчной и заглавной букве и одну цифру')

        const sameEmailExists = await this.getByQuery({ where: { email: user.email } }, true)[0] as User
        if (sameEmailExists) throw new HTTPError(400, 'Пользователь с таким Email уже зарегистрирован')

        user.password = ((await bcrypt.hash(user.password, 10)) as string)
        const newUser = await this.create(user)
        return newUser
    }
}

export default new UserService()
