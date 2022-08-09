import EducationalProgram from '../models/educationalProgram.js'

class EducationalProgramService {
    model: typeof EducationalProgram

    constructor() {
        this.model = EducationalProgram
    }

    async get(id: number) {
        return await this.model.findByPk(id)
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(educationalProgram: Record<string, unknown>) {
        return await this.model.create(educationalProgram)
    }
}

export default new EducationalProgramService()
