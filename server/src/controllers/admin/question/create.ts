import questionService from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const AMOUNT_LIMITS = {
    bachelor: 10,
    master: 10
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { question, answer } = req.body
    const page = req.query.page.toString()
    const amount = await questionService.count({ where: { page } })

    if (amount >= AMOUNT_LIMITS[page]) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество ответов на вопросы (${ AMOUNT_LIMITS[page] }). Чтобы создать новый, необходимо удалить один из существующих`)
    }

    const result = await questionService.create({
        text: question,
        answer: answer,
        page: page as 'bachelor' | 'master'
    })

    const response = {
        message: 'Ответ на вопрос успешно создан',
        question: result
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})