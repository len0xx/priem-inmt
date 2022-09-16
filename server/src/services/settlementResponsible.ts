import BaseService from './base.js'
import SettlementResponsible, { ISettlementResponsible } from '../models/settlementResponsible.js'

class SettlementResponsibleService extends BaseService<SettlementResponsible, ISettlementResponsible> {
    constructor() {
        super()
        this.model = SettlementResponsible
    }
}

export default new SettlementResponsibleService()