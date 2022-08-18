import questionSerivce from '../../../services/question.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const question = await questionSerivce.getById(id)

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { question })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}

export const getAll = async (_: Request, res: Response) => {
    try {
        const questions = await questionSerivce.get()

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
