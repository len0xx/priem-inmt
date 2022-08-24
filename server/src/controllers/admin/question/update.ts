import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { question, answer } = req.body

    await questionSerivce.updateById(id, {
        text: question,
        answer: answer
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос и ответ успешно обновлён')
})
