import partnerService from '../../../services/partner.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const partner = await partnerService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { partner })
})

export const getAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const partners = await partnerService.get({ order: [ [ 'id', 'ASC' ] ] })
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { partners })
})
