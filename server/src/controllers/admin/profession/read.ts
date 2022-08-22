import professionService from '../../../services/profession.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const professions = await professionService.get()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { professions })
})

export const readOne = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const profession = await professionService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { profession })
})