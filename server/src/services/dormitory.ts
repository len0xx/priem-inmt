import BaseService from './base.js'
import Dormitory, { IDormitory } from '../models/Dormitory.js'

class DormitoryService extends BaseService<Dormitory, IDormitory> {
    constructor() {
        super()
        this.model = Dormitory
    }
}

export default new DormitoryService()