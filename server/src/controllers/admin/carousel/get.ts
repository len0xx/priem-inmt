import carouselService from '../../../services/carousel.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Name {
    About = 'about',
    Life = 'life',
}

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const image = await carouselService.getById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { image })
})

export const getAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const name = req.query.name

    const getImagesWhereName = async (name: Name) => {
        const images = await carouselService.findAll({
            where: {
                name: name
            }
        })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { images })
    }

    if (name === Name.About) {
        getImagesWhereName(Name.About)
    } else if (name == Name.Life) {
        getImagesWhereName(Name.Life)
    } else {
        const images = await carouselService.get()
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { images })
    }
})
