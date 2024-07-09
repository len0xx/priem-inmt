import BaseService from './base.js'
import Profession, { IProfession } from '../models/profession.js'

class ProfessionService extends BaseService<Profession, IProfession> {
    constructor() {
        super()
        this.model = Profession
    }
}

export default new ProfessionService()