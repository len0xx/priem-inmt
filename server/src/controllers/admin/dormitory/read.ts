import dormitoryService from '../../../services/dormitory.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const dormitories = await dormitoryService.get()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { dormitories })
})

export const readOne = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const dormitory = await dormitoryService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { dormitory })
})