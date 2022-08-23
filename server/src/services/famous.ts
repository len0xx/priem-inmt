import BaseService from './base.js'
import Famous, { FamousI } from '../models/famous.js'

class FamousService extends BaseService<Famous, FamousI> {
    constructor() {
        super()
        this.model = Famous
    }
}

export default new FamousService()