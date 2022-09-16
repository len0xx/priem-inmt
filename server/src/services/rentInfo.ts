import BaseService from './base.js'
import RentInfo, { IRentInfo } from '../models/RentInfo.js'

class RentInfoService extends BaseService<RentInfo, IRentInfo> {
    constructor() {
        super()
        this.model = RentInfo
    }

    async getById(id = 1) {
        return await this.model.findByPk(id)
    }
}

export default new RentInfoService()