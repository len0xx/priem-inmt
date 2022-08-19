import opportunityService from '../../../services/opportunity.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { OpportunityI } from '../../../models/opportunity.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { title, description } = req.body
    const newData: OpportunityI = { title, description }
    await opportunityService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Возможность успешно обновлена')
})