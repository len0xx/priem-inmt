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
        imgURL = file ? file.src : undefined
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
})