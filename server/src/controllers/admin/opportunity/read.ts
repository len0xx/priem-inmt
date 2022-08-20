import opportunityService from '../../../services/opportunity.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const opportunities = await opportunityService.get()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { opportunities })
})

export const readOne = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const opportunity = await opportunityService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { opportunity })
})