import settlementResponsible from '../../../services/settlementResponsible.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, label, address, auditory, phone, email, photo } = req.body

    let photoURL: string
    if (+photo && !isNaN(+photo)) {
        const file = await documentService.getById(+photo)
        photoURL = file ? file.src : undefined
    }

    await settlementResponsible.create({
        name, label,
        address, auditory,
        phone, email, photo: photoURL
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Ответственный за поселение успешно создан')
})
