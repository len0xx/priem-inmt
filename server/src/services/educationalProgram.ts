import BaseService from './base.js'
import EducationalProgram, { EducationalProgramI } from '../models/educationalProgram.js'
import { HTTPError } from '../utilities.js'
import { HTTPStatus, DegreeLevel } from '../types/enums.js'

class EducationalProgramService extends BaseService<EducationalProgram, EducationalProgramI> {
    constructor() {
        super()
        this.model = EducationalProgram
    }

    override async create(educationalProgram: EducationalProgramI) {
        const validateModes = (mode) => {
            if (!mode[1].vacantSpots.budget || !mode[1].vacantSpots.contract)
                throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поля "Количество мест" являются обязательными')

            if (isNaN(mode[1].vacantSpots.budget) || isNaN(mode[1].vacantSpots.contract))
                throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Количество мест" должно являться числовым')

            if (!mode[1].price)
                throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Стоимость обучения" является обязательным')

            if (!mode[1].duration)
                throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Срок обучения" является обязательным')

            if (!mode[1].languages)
                throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Язык освоения" является обязательным')

        }

        const educationModes = educationalProgram.educationModes
        Object.entries(educationModes).map(mode => validateModes(mode))

        const directions = educationalProgram.directions

        if (!directions.join(','))
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Направление подготовки" является обязательным')

        const degree = educationalProgram.degree
        const exams = educationalProgram.exams

        if ((degree === DegreeLevel.BACHELOR || degree === DegreeLevel.SPECIALIST) && exams.length === 0)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Необходимо указать хотя бы один экзамен')

        const teacher = educationalProgram.teacher

        if (!teacher.name)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "ФИО" руководителя программы является обязательным')

        if (!teacher.caption)
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Учёные звания" руководителя программы является обязательным')

        const description = educationalProgram.text

        if (description === '<p></p>')
            throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Описание программы" является обязательным')

        return await this.model.create(educationalProgram)
    }
}

export default new EducationalProgramService()
