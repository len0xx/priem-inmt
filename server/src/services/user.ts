import BaseService from './base.js'
import User, { IUser } from '../models/user.js'
import { HTTPError, comparePasswords } from '../utilities.js'
import dotenv from 'dotenv'
import { HTTPStatus } from '../types/enums.js'
import type { FindOptions } from 'sequelize'

dotenv.config()

class UserService extends BaseService<User, IUser> {
    constructor() {
        super()
        this.model = User
    }

    override async getById(id: number, fetchPassword = false) {
        const attributes = [ 'firstName', 'lastName', 'id', 'email', 'role' ]
        if (fetchPassword) attributes.push('password')

        return await this.model.findByPk(id, { attributes })
    }

    override async get(where: FindOptions, fetchPassword = false) {
        const attributes = [ 'firstName', 'lastName', 'id', 'email', 'role' ]
        if (fetchPassword) attributes.push('password')

        const result = await this.model.findAll({ ...where, attributes })
        return result
    }

    async login(email: string, password: string, ip: string) {
        const results = await this.get({ where: { email } }, true)
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
            await this.update({ where: { id: user.id } }, newData)
        }
        catch (e) {
            console.error(e)
        }

        return user.id
    }

    async signup(user: IUser) {
        if (!user.email)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Email является обязательным для заполнения')

        if (!user.password)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Пароль является обязательным для заполнения')

        const sameEmailExists = (await this.get({ where: { email: user.email } }, true)[0]) as User
        if (sameEmailExists)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Пользователь с таким Email уже зарегистрирован')

        const newIUserd = (await this.create(user)).id
        return newIUserd
    }
}

export default new UserService()
