import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Page {
    Bachelor = 'bachelor',
    Master = 'master',
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { question, answer } = req.body

    const page = req.query.degree

    if (page === Page.Bachelor || page === Page.Master) {
        await questionSerivce.create({
            text: question,
            answer: answer,
            page: page
        })
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос и ответ успешно создан')
})
