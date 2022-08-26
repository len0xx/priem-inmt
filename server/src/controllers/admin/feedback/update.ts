import feedbackService from '../../../services/feedback.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { name, description, img, text } = req.body

    let imgURL = undefined
    if (img) {
        const file = await documentService.getById(+img)
        imgURL = file.src
    }

    const newData = { name, description, img: imgURL, text }
    await feedbackService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Отзыв успешно обновлен')
})
