import feedbackService from '../../../services/feedback.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const AMOUNT_LIMITS = {
    bachelor: 12,
    master: 12
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, description, img, text } = req.body
    const page = req.query.page.toString()
    const amount = await feedbackService.count({ where: { page } })

    if (amount >= AMOUNT_LIMITS[page]) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество отзывов (${ AMOUNT_LIMITS[page] }). Чтобы создать новый, необходимо удалить один из существующих`)
    }

    let imgURL: string
    if (+img && !isNaN(+img)) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const feedback = await feedbackService.create( { page: (page as 'bachelor' | 'master'), name, description, img: imgURL, text } )

    const response = {
        message: 'Отзыв успешно создан',
        feedback
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})