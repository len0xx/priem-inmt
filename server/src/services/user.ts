import User, { UserI } from '../models/user.js'
import { HTTPError, comparePasswords } from '../utilities.js'
import dotenv from 'dotenv'
import type { FindOptions, UpdateOptions, InferAttributes } from 'sequelize'
import { HTTPStatus } from '../types/enums.js'

dotenv.config()

class UserService {
    model: typeof User

    constructor() {
        this.model = User
    }

    async get(id: number, fetchPassword = false) {
        const attributes = [ 'firstName', 'lastName', 'id', 'email', 'role' ]
        if (fetchPassword) attributes.push('password')

        return await this.model.findByPk(id, { attributes })
    }

    async getByQuery(where: FindOptions<InferAttributes<User>>, fetchPassword = false) {
        const attributes = [ 'firstName', 'lastName', 'id', 'email', 'role' ]
        if (fetchPassword) attributes.push('password')

        const result = await this.model.findAll({ ...where, attributes })
        return result
    }

    async update(data: Record<string, unknown>, where: UpdateOptions) {
        return await this.model.update(data, where)
    }

    async getAll() {
        return (await this.model.findAll())
    }

    async create(user: UserI) {
        const result = await this.model.create(user)
        return result.id
    }

    async login(email: string, password: string, ip: string) {
        const results = await this.getByQuery({ where: { email } }, true)
        const user = results[0]

        if (!user)
            throw new HTTPError(HTTPStatus.NOT_FOUND, 'Пользователь с таким Email не найден')

        const passwordComparison = comparePasswords(password, user.password)
        if (!passwordComparison)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Неверный пароль')

        const newData = {
            lastLoginDate: new Date(),
            lastLoginIP: ip
        }
        try {
            await this.update(newData, { where: { id: user.id } })
        }
        catch (e) {
            console.error(e)
        }

        return user.id
    }

    async signup(user: UserI) {
        if (!user.email)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Email является обязательным для заполнения')

        if (!user.password)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Пароль является обязательным для заполнения')

        const sameEmailExists = (await this.getByQuery({ where: { email: user.email } }, true)[0]) as User
        if (sameEmailExists)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Пользователь с таким Email уже зарегистрирован')

        const newUserId = await this.create(user)
        return newUserId
    }
}

export default new UserService()
