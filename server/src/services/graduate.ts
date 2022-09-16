import BaseService from './base.js'
import Graduate, { IGraduate } from '../models/graduate.js'

class GraduateService extends BaseService<Graduate, IGraduate> {
    constructor() {
        super()
        this.model = Graduate
    }
}

export default new GraduateService()