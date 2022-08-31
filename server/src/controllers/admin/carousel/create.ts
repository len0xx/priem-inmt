import carouselService from '../../../services/carousel.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Carousel {
    About = 'about',
    Life = 'life'
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { img } = req.body

    const name = req.query.name

    if (name === Carousel.About || name === Carousel.Life) {
        let imgURL = undefined
        if (img) {
            const file = await documentService.getById(+img)
            imgURL = file.src
        }

        const image = await carouselService.create({
            img: imgURL,
            name: name
        })

        const response = {
            message: 'Изображение в карусели успешно создано',
            image
        }
        return new HTTPResponse(res, HTTPStatus.CREATED, response)
    }
    return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Неправильный параметр запроса')
})
