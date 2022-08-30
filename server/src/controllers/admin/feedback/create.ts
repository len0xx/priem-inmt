import feedbackService from '../../../services/feedback.js'
import documentService from '../../../services/document.js'
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

        let imgURL = undefined
        if (img) {
            const file = await documentService.getById(+img)
            imgURL = file.src
        }

        const feedback = await feedbackService.create( { page, name, description, img: imgURL, text } )

        const response = {
            message: 'Отзыв успешно создан',
            feedback
        }
        return new HTTPResponse(res, HTTPStatus.CREATED, response)
    }
    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Неправильный параметр запроса')
})