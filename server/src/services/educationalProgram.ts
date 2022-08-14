import BaseService from './base.js'
import EducationalProgram, { EducationalProgramI } from '../models/educationalProgram.js'

class EducationalProgramService extends BaseService<EducationalProgram, EducationalProgramI> {
    constructor() {
        super()
        this.model = EducationalProgram
    }
}

export default new EducationalProgramService()
