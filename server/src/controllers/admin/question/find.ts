import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const findBachelor = catchHTTPErrors(async (_: Request, res: Response) => {
    const questions = await questionSerivce.findAll({
        where: {
            page: 'bachelor'
        }
    })

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
})

export const findMaster = catchHTTPErrors(async (_: Request, res: Response) => {
    const questions = await questionSerivce.findAll({
        where: {
            page: 'master'
        }
    })

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
})