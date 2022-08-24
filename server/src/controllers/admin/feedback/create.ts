import feedbackService from '../../../services/feedback.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { level, name, description, img, text } = req.body
    await feedbackService.create( { level, name, description, img, text } )

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Отзыв успешно создан')
})