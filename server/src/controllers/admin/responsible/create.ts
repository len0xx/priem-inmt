import responsibleService from '../../../services/responsible.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, label, phone, email, img } = req.body

    let imgURL: string
    if (+img && !isNaN(+img)) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const responsible = await responsibleService.create({
        name,
        label,
        phone,
        email,
        img: imgURL
    })

    const response = {
        message: 'Ответственное лицо успешно создано',
        responsible
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
