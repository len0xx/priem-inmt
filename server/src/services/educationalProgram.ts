import BaseService from './base.js'
import EducationalProgram, { EducationalProgramI } from '../models/educationalProgram.js'
import { HTTPError } from '../utilities.js'
import { HTTPStatus } from '../types/enums.js'

class EducationalProgramService extends BaseService<EducationalProgram, EducationalProgramI> {
    constructor() {
        super()
        this.model = EducationalProgram
    }

    override async create(educationalProgram: EducationalProgramI) {
        console.log(educationalProgram.educationModes.fullTime.vacantSpots)
        const checkNumber = (mode) => {
            if (isNaN(mode[1].vacantSpots.budget) || isNaN(mode[1].vacantSpots.contract))
                throw new HTTPError(HTTPStatus.NOT_ALLOWED, 'Поле "Количество мест" должно являться числовым')
        }

        const educationModes = educationalProgram.educationModes
        Object.entries(educationModes).map(mode => checkNumber(mode))

        return await this.model.create(educationalProgram)
    }
}

export default new EducationalProgramService()
