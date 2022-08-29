import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Type {
    Bachelor = 'bachelor',
    InstInfo = 'instInfo',
    Main = 'main',
    Master = 'master'
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body

    const type = req.query.type

    if (type === Type.Bachelor || type === Type.InstInfo || type === Type.Main || type === Type.Master) {
        const feature = await featureService.create({ title, description, type })

        const response = {
            message: 'Перечисление успешно создано',
            feature
        }
        return new HTTPResponse(res, HTTPStatus.CREATED, response)
    }
    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Неправильный параметр запроса')
})
