import feedbackService from '../../../services/feedback.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Page {
    Bachelor = 'bachelor',
    Master = 'master',
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, description, img, text } = req.body
    const page = req.query.page

    if (page === Page.Bachelor || page === Page.Master) {
        await feedbackService.create( { page, name, description, img, text } )
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Отзыв успешно создан')
    }
    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Неправильный параметр запроса')
})