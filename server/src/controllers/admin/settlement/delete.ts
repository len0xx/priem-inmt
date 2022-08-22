import settlementResponsible from '../../../services/settlementResponsible.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    await settlementResponsible.deleteById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Ответственный за поселение успешно удален')
})
