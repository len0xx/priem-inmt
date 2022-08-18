import dormitoryService from '../../../services/dormitory.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { img, title, address } = req.body
    await dormitoryService.create( { img, title, address } )

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Общежитие успешно создано')
})