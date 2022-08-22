import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const question = await questionSerivce.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { question })
})

export const getAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const questions = await questionSerivce.get()

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
})