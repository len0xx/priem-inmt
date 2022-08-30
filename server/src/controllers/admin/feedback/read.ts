import feedbackService from '../../../services/feedback.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { FindOptions } from 'sequelize/types/model.js'

enum Page {
    Bachelor = 'bachelor',
    Master = 'master',
}

export const readOne = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const feedback = await feedbackService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { feedback })
})

export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const page = req.query.page
    const options: FindOptions = (page === Page.Bachelor || page === Page.Master) ? { where: { page } } : {}

    const feedbacks = await feedbackService.get(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { feedbacks })
})