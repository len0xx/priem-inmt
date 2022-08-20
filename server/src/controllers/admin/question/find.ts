import questionSerivce from '../../../services/question.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const findBachelor = async (_: Request, res: Response) => {
    try {
        const questions = await questionSerivce.findAll({
            where: {
                page: 'bachelor'
            }
        })

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}

export const findMaster = async (_: Request, res: Response) => {
    try {
        const questions = await questionSerivce.findAll({
            where: {
                page: 'master'
            }
        })

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}