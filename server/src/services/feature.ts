import BaseService from './base.js'
import Feature, { FeatureI } from '../models/feature.js'

class FeatureService extends BaseService<Feature, FeatureI> {
    constructor() {
        super()
        this.model = Feature
    }
}

export default new FeatureService()
