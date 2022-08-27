import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const page = req.query.page as string

    const results = await textService.get(page ? { where: { page } } : {})
    const info: Record<string, string> = {}
    for (const row of results) {
        info[row.name] = row.content
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { info })
})