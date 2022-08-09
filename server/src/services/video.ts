import Video from '../models/Video.js'
import sequelize from '../../db.js'
import type { Sequelize } from 'sequelize/types'

class VideoService {
    client: Sequelize
    model: typeof Video

    constructor(sequelize: Sequelize) {
        this.client = sequelize
        this.model = Video
    }

    async get(id: number) {
        return await this.model.findByPk(id)
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(video: { src: string }) {
        return await this.model.create(video)
    }
}

export default new VideoService(sequelize)