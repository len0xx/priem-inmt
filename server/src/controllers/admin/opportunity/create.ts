import opportunityService from '../../../services/opportunity.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body

    const opportunity = await opportunityService.create( { title, description } )

    const response = {
        message: 'Возможность успешно создана',
        opportunity
    }

    console.log(response)

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})