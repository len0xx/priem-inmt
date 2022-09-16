import Opportunity, { type IOpportunity } from '../models/opportunity.js'
import BaseService from './base.js'

class OpportunityService extends BaseService<Opportunity, IOpportunity> {
    constructor() {
        super()
        this.model = Opportunity
    }
}

export default new OpportunityService()