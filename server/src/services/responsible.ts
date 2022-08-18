import BaseService from './base.js'
import Responsible, { ResponsibleI } from '../models/responsible.js'
// import { HTTPError } from '../utilities.js'
// import { HTTPStatus } from '../types/enums.js'

class ResponsibleService extends BaseService<Responsible, ResponsibleI> {
    constructor() {
        super()
        this.model = Responsible
    }

    // override async create(responsible: ResponsibleI) {
    //     if (!responsible.name)
    //         throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "ФИО" является обязательным')

    //     if (!responsible.label)
    //         throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Подпись" является обязательным')

    //     if (!responsible.phone)
    //         throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Номер телефона" является обязательным')

    //     if (!responsible.email)
    //         throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поле "Адрес электронной почты" является обязательным')

    //     return await this.model.create(responsible)
    // }
}

export default new ResponsibleService()