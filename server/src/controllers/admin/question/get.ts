import questionSerivce from '../../../services/question.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Page {
    Bachelor = 'bachelor',
    Master = 'master',
}

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const question = await questionSerivce.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { question })
})

export const getAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const page = req.query.page

    const getQuestionsWherePage = async (page: string) => {
        const questions = await questionSerivce.findAll({
            where: {
                page: page
            }
        })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
    }

    if (page === Page.Bachelor) {
        getQuestionsWherePage(Page.Bachelor)
    } else if (page == Page.Master) {
        getQuestionsWherePage(Page.Master)
    } else {
        const questions = await questionSerivce.get()
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { questions })
    }
})