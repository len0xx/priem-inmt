import graduateService from '../../../services/graduate.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const graduate = await graduateService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { graduate })
})

export const readAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const graduates = await graduateService.get({ order: [ [ 'id', 'ASC' ] ] })
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { graduates })
})
