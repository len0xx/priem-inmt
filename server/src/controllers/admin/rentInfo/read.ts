import rentInfoService from '../../../services/rentInfo.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const read = catchHTTPErrors(async (_: Request, res: Response) => {
    const rentInfo = await rentInfoService.getById()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { rentInfo })
})