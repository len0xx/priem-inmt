import BaseService from './base.js'
import Profession, { ProfessionI } from '../models/Profession.js'

class ProfessionService extends BaseService<Profession, ProfessionI> {
    constructor() {
        super()
        this.model = Profession
    }
}

export default new ProfessionService()