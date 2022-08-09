import EducationalProgram from '../models/educationalProgram.js'
import sequelize from '../../db.js'
import type { Sequelize } from 'sequelize/types'

class EducationalProgramService {
    client: Sequelize
    model: typeof EducationalProgram

    constructor(sequelize: Sequelize) {
        this.client = sequelize
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

export default new EducationalProgramService(sequelize)
