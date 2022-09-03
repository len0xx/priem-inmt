import feedbackService from '../../../services/feedback.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, description, img, text } = req.body
    const page = req.query.page.toString()

    let imgURL: string
    if (img) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const feedback = await feedbackService.create( { page, name, description, img: imgURL, text } )

    const response = {
        message: 'Отзыв успешно создан',
        feedback
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})