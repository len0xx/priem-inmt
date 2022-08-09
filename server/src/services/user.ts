import User, { UserI } from '../models/user.js'

class UserService {
    model: typeof User

    constructor() {
        this.model = User
    }

    async get(id: number) {
        return await this.model.findByPk(id)
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(user: UserI) {
        return await this.model.create(user)
    }
}

export default new UserService()
