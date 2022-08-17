import feedbackService from '../../../services/feedback.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const feedbacks = await feedbackService.get()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { feedbacks })
})

export const readOne = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const feedback = await feedbackService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { feedback })
})