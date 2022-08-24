import BaseService from './base.js'
import Graduate, { GraduateI } from '../models/graduate.js'

class GraduateService extends BaseService<Graduate, GraduateI> {
    constructor() {
        super()
        this.model = Graduate
    }
}

export default new GraduateService()