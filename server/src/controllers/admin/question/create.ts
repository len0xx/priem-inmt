import questionSerivce from '../../../services/question.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const createBachelor = async (req: Request, res: Response) => {
    try {
        const { question, answer } = req.body

        const page = 'bachelor'

        await questionSerivce.create({
            text: question,
            answer: answer,
            page: page
        })
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос на ответ успешно создан')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}

export const createMaster = async (req: Request, res: Response) => {
    try {
        const { question, answer } = req.body

        const page = 'master'

        await questionSerivce.create({
            text: question,
            answer: answer,
            page: page
        })
        return new HTTPResponse(res, HTTPStatus.CREATED, 'Вопрос на ответ успешно создан')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
