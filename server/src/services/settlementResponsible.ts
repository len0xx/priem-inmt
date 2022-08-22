import BaseService from './base.js'
import SettlementResponsible, { SettlementResponsibleI } from '../models/settlementResponsible.js'

class SettlementResponsibleService extends BaseService<SettlementResponsible, SettlementResponsibleI> {
    constructor() {
        super()
        this.model = SettlementResponsible
    }
}

export default new SettlementResponsibleService()