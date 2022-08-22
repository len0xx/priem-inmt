import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const createBachelor = catchHTTPErrors(async (req: Request, res: Response) => {
    const { question, answer } = req.body

    const page = 'bachelor'

    await questionSerivce.create({
        text: question,
        answer: answer,
        page: page
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос на ответ успешно создан')
})

export const createMaster = catchHTTPErrors(async (req: Request, res: Response) => {
    const { question, answer } = req.body

    const page = 'master'

    await questionSerivce.create({
        text: question,
        answer: answer,
        page: page
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос на ответ успешно создан')
})
