import questionSerivce from '../../../services/question.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const { question, answer } = req.body

        await questionSerivce.updateById(id, {
            text: question,
            answer: answer
        })
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос на ответ успешно обновлён')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
