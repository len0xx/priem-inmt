import carouselService from '../../../services/carousel.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { img } = req.body
    const name = req.query.name.toString()

    let imgURL: string
    if (img) {
        const file = await documentService.getById(+img)
        imgURL = file.src
    }

    await carouselService.create({
        img: imgURL,
        name: name
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Изображение в карусели успешно создано')
})
