import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { WhereOptions } from 'sequelize'

export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const type = req.query.type ? req.query.type.toString() : undefined
    const page = req.query.page ? +req.query.page : undefined
    const LIMIT = 9
    const options: WhereOptions = type ? { where: { type } } : {}
    if (page) {
        options.offset = LIMIT * (page - 1)
        options.limit = LIMIT
    }

    const documents = await documentService.get(options)
    const amount = await documentService.count()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { documents, amount })
})

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const document = await documentService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { document })
})
