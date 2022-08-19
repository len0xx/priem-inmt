import opportunityService from '../../../services/opportunity.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body
    await opportunityService.create( { title, description } )

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Возможность успешно создана')
})