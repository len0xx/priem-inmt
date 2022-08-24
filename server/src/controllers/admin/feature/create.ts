import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Page {
    Bachelor = 'bachelor',
    Master = 'master',
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body

    const page = req.query.page

    if (page === Page.Bachelor || page === Page.Master) {
        await featureService.create({
            title: title,
            description: description,
            page: page
        })
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Особенность успешно создана')
    }
    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Неправильный параметр запроса')
})
