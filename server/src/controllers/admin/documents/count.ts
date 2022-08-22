import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const count = catchHTTPErrors(async (req: Request, res: Response) => {
    const type = req.query.type ? req.query.type.toString() : undefined
    let options: any = type ? { where: { type } } : {} // eslint-disable-line no-any

    const amount = await documentService.count(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { amount })
})
