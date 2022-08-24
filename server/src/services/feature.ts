import BaseService from './base.js'
import Feature, { FeatureI } from '../models/feature.js'
import type { IndexesOptions } from 'sequelize'

class FeatureService extends BaseService<Feature, FeatureI> {
    constructor() {
        super()
        this.model = Feature
    }

    async findAll(options: IndexesOptions) {
        return await this.model.findAll(options)
    }
}

export default new FeatureService()
