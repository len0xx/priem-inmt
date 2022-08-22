import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const type = req.query.type.toString()
    const options = type ? { where: { type } } : {}

    const documents = await documentService.get(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { documents })
})

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const document = await documentService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { document })
})
