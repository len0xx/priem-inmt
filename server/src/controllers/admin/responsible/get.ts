import responsibleService from '../../../services/responsible.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const responsible = await responsibleService.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { responsible })
})

export const getAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const responsibles = await responsibleService.get()

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { responsibles })
})
