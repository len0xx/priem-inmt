import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { question, answer } = req.body

    const page = req.query.page.toString()

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
})