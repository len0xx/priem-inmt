import settlementResponsible from '../../../services/settlementResponsible.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const read = catchHTTPErrors(async (_: Request, res: Response) => {
    const responsible = (await settlementResponsible.get({ limit: 1, order: [ [ 'id', 'ASC' ] ] }))[0]
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { responsible })
})
