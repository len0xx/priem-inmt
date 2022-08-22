import BaseService from './base.js'
import RentInfo, { RentInfoI } from '../models/RentInfo.js'

class RentInfoService extends BaseService<RentInfo, RentInfoI> {
    constructor() {
        super()
        this.model = RentInfo
    }

    async getById(id = 1) {
        return await this.model.findByPk(id)
    }
}

export default new RentInfoService()