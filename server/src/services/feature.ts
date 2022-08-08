import Feature from '../models/feature.js'
import sequelize from '../../db.js'
import type { Sequelize } from 'sequelize/types'

class FeatureService {
    client: Sequelize
    model: typeof Feature

    constructor(sequelize: Sequelize) {
        this.client = sequelize
        this.model = Feature
    }

    async get(id: number) {
        return await this.model.findOne({ where: { id } })
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(feature: { title: string, description: string }) {
        return await this.model.create(feature)
    }
}

export default new FeatureService(sequelize)
