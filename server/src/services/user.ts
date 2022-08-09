import User from '../models/user.js'
import sequelize from '../../db.js'
import type { Sequelize } from 'sequelize/types'

class UserService {
    client: Sequelize
    model: typeof User

    constructor(sequelize: Sequelize) {
        this.client = sequelize
        this.model = User
    }

    async get(id: number) {
        return await this.model.findByPk(id)
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(user: { firstName: string, lastName: string, email: string, password: string }) {
        return await this.model.create(user)
    }
}

export default new UserService(sequelize)
