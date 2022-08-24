import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { WhereOptions } from 'sequelize/types/model.js'

export const count = catchHTTPErrors(async (req: Request, res: Response) => {
    const type = req.query.type ? req.query.type.toString() : undefined
    const options: WhereOptions = type ? { where: { type } } : {}

    const amount = await documentService.count(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { amount })
})
