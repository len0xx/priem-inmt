import EducationalProgram, { EducationalProgramI } from '../models/educationalProgram.js'

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

    async create(educationalProgram: EducationalProgramI) {
        return await this.model.create(educationalProgram)
    }

    async edit(id: number, educationalProgram: EducationalProgramI) {
        const program = await this.model.findByPk(id)
        return await program.update(educationalProgram)
    }

    async remove(id: number) {
        const program = await this.model.findByPk(id)
        return await program.destroy()
    }
}

export default new EducationalProgramService()
