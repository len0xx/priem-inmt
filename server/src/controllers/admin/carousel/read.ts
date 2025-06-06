import carouselService from '../../../services/carousel.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { FindOptions } from 'sequelize'

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const image = await carouselService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { image })
})

export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const name = req.query.name
    const options: FindOptions = name ? { where: { name } } : {}
    options.order = [ [ 'id', 'ASC' ] ]

    const images = await carouselService.get(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { images })
})
