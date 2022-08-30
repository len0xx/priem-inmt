import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { FindOptions } from 'sequelize/types/model.js'

export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const page = req.query.page as string
    const options: FindOptions = page ? { where: { page } } : {}

    const results = await textService.get(options)
    const info: Record<string, string> = {}
    for (const row of results) {
        info[row.name] = row.content
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { info })
})