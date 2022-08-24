import carouselService from '../../../services/carousel.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const image = await carouselService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { image })
})

export const getAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const images = await carouselService.get()
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { images })
})
