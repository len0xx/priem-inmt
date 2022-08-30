import carouselService from '../../../services/carousel.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { FindOptions } from 'sequelize'

enum Carousel {
    About = 'about',
    Life = 'life'
}

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const image = await carouselService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { image })
})

export const getAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const name = req.query.name
    const options: FindOptions = (name === Carousel.About || name === Carousel.Life) ? { where: { name } } : {}

    const images = await carouselService.get(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { images })
})
