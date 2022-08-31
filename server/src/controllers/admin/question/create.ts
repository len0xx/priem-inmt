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

    const page = req.query.page

    if (page === Page.Bachelor || page === Page.Master) {
        const result = await questionSerivce.create({
            text: question,
            answer: answer,
            page: page
        })

        const response = {
            message: 'Ответ на вопрос успешно создан',
            question: result
        }
        return new HTTPResponse(res, HTTPStatus.CREATED, response)
    }
    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Неправильный параметр запроса')
})