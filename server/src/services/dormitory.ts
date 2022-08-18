import BaseService from './base.js'
import Dormitory, { DormitoryI } from '../models/Dormitory.js'

class DormitoryService extends BaseService<Dormitory, DormitoryI> {
    constructor() {
        super()
        this.model = Dormitory
    }
}

export default new DormitoryService()