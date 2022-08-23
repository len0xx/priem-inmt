import BaseService from './base.js'
import Partner, { PartnerI } from '../models/partner.js'

class PartnerService extends BaseService<Partner, PartnerI> {
    constructor() {
        super()
        this.model = Partner
    }
}

export default new PartnerService()