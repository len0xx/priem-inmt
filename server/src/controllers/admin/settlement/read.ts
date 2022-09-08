import settlementResponsible from '../../../services/settlementResponsible.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const responsible = await settlementResponsible.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { responsible })
})
