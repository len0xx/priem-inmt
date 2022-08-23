import famousService from '../../../services/famous.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const famous = await famousService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { famous })
})

export const getAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const famousStudents = await famousService.get()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { famousStudents })
})
