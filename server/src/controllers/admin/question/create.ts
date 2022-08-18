import questionSerivce from '../../../services/question.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = async (req: Request, res: Response) => {
    try {
        const { text, answer } = req.body

        await questionSerivce.create({
            text: text,
            answer: answer,
        })
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос и ответ FAQ успешно создан')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
