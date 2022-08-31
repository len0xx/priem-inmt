import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { FindOptions } from 'sequelize'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const question = await questionSerivce.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { question })
})

export const getAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const page = req.query.page
    const options: FindOptions = page ? { where: { page } } : {}

    const questions = await questionSerivce.get(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
})