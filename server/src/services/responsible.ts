import BaseService from './base.js'
import Responsible, { IResponsible } from '../models/responsible.js'

class ResponsibleService extends BaseService<Responsible, IResponsible> {
    constructor() {
        super()
        this.model = Responsible
    }
}

export default new ResponsibleService()