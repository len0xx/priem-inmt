import famousService from '../../../services/famous.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const del = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    await famousService.deleteById(id)
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Известный выпускник успешно удален')
})
