import feedbackService from '../../../services/feedback.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

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

    const getByPage = async (page: string) => {
        const feedbacks = await feedbackService.get({ where: { page } })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { feedbacks })
    }

    if (page === Page.Bachelor) {
        getByPage(Page.Bachelor)
    } else if (page == Page.Master) {
        getByPage(Page.Master)
    } else {
        const questions = await feedbackService.get()
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
    }
})