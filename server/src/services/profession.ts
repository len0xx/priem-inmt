import BaseService from './base.js'
import Profession, { IProfession } from '../models/Profession.js'

class ProfessionService extends BaseService<Profession, IProfession> {
    constructor() {
        super()
        this.model = Profession
    }
}

export default new ProfessionService()