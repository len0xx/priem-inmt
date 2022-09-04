import carouselService from '../../../services/carousel.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_IMAGES_AMOUNT = 15

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { img } = req.body
    const name = req.query.name.toString()
    const amount = await carouselService.count()

    if (amount >= MAX_IMAGES_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество изображений в карусели (${ MAX_IMAGES_AMOUNT }). Чтобы добавить новое, необходимо удалить одно из существующих`)
    }

    let imgURL: string
    if (+img && !isNaN(+img)) {
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