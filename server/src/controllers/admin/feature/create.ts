import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Type {
    BachelorPromo = 'bachelorPromo',
    BachelorInstInfo = 'bachelorInstInfo',
    Master = 'master',
    Main = 'main'
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body

    const type = req.query.type
    
    if (type === Type.BachelorPromo || type === Type.BachelorInstInfo || type === Type.Master || type === Type.Main) {
        const feature = await featureService.create({ title, description, type })

        const response = {
            message: 'Перечисление успешно создано',
            feature
        }
        return new HTTPResponse(res, HTTPStatus.CREATED, response)
    }
    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Неправильный параметр запроса')
})
