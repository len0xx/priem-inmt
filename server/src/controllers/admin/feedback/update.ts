import feedbackService from '../../../services/feedback.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { FeedbackI } from '../../../models/feedback.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { level, name, description, img, text } = req.body
    const newData: FeedbackI = { level, name, description, img, text }
    await feedbackService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Отзыв успешно обновлен')
})
