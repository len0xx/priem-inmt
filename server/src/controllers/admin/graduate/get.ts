import graduateService from '../../../services/graduate.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const graduate = await graduateService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { graduate })
})

export const getAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const graduates = await graduateService.get()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { graduates })
})
