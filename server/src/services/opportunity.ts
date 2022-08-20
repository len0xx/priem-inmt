import Opportunity, { type OpportunityI } from '../models/opportunity.js'
import BaseService from './base.js'

class OpportunityService extends BaseService<Opportunity, OpportunityI> {
    constructor() {
        super()
        this.model = Opportunity
    }
}

export default new OpportunityService()