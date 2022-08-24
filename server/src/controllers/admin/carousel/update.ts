import carouselService from '../../../services/carousel.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { img } = req.body

    let imgURL = undefined
    if (img) {
        const file = await documentService.getById(+img)
        imgURL = file.src
    }

    await carouselService.updateById(id, {
        img: imgURL
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Изображение в карусели успешно обновлено')
})
