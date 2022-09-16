import BaseService from './base.js'
import Partner, { IPartner } from '../models/partner.js'

class PartnerService extends BaseService<Partner, IPartner> {
    constructor() {
        super()
        this.model = Partner
    }
}

export default new PartnerService()