import BaseService from './base.js'
import EducationalProgram, { IEducationalProgram } from '../models/educationalProgram.js'
import { HTTPError } from '../utilities.js'
import { HTTPStatus, DegreeLevel } from '../types/enums.js'
import type { IndexesOptions } from 'sequelize'

const validateModes = (mode) => {
    const budgetSpots = mode[1].vacantSpots.budget
    const contractSpots = mode[1].vacantSpots.contract
    if (budgetSpots == undefined || contractSpots == undefined)
        throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поля "Количество мест" являются обязательными')

    if (isNaN(budgetSpots) || isNaN(contractSpots))
        throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Количество мест" должно являться числовым')

    // if (!mode[1].price)
    //     throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Стоимость обучения" является обязательным')

    if (!mode[1].duration)
        throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Срок обучения" является обязательным')

    if (!mode[1].languages)
        throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Язык освоения" является обязательным')

}

class EducationalProgramService extends BaseService<EducationalProgram, IEducationalProgram> {
    constructor() {
        super()
        this.model = EducationalProgram
    }

    override async create(educationalProgram: IEducationalProgram) {
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

    override async updateById(id: number, educationalProgram: IEducationalProgram) {
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

        return await this.update({ where: { id } }, educationalProgram)
    }

    async findAll(options: IndexesOptions) {
        return await this.model.findAll(options)
    }
}

export default new EducationalProgramService()
