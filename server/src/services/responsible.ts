import BaseService from './base.js'
import Responsible, { ResponsibleI } from '../models/responsible.js'

class ResponsibleService extends BaseService<Responsible, ResponsibleI> {
    constructor() {
        super()
        this.model = Responsible
    }
}

export default new ResponsibleService()