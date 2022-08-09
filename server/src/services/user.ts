import User from '../models/user.js'
import type { PublicUser } from '../models/user'
import type { DefaultModel } from '../types'

class UserService {
    model: typeof User

    constructor() {
        this.model = User
    }

    private getPublicObject(user: User): PublicUser {
        const newUser: PublicUser & User & DefaultModel = user as User & DefaultModel
        delete newUser.password
        delete newUser.createdAt
        delete newUser.updatedAt
        return newUser
    }

    async get(id: number) {
        const user = await this.model.findByPk(id)
        return user
    }

    async getAll() {
        const users = await this.model.findAll()
        return users.map(this.getPublicObject)
    }

    async create(user: { firstName: string, lastName: string, email: string, password: string }) {
        const newUser = await this.model.create(user)
        return this.getPublicObject(newUser)
    }
}

export default new UserService()
