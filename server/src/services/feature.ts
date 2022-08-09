import Feature from '../models/feature.js'

class FeatureService {
    model: typeof Feature

    constructor() {
        this.model = Feature
    }

    async get(id: number) {
        return await this.model.findByPk(id)
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(feature: { title: string, description: string }) {
        return await this.model.create(feature)
    }
}

export default new FeatureService()
