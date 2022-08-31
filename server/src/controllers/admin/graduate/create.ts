import graduateService from '../../../services/graduate.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, description, graduateYear, photo } = req.body

    let photoURL: string
    if (photo) {
        const file = await documentService.getById(+photo)
        photoURL = file.src
    }

    await graduateService.create({
        name: name,
        description: description,
        graduateYear: graduateYear,
        photo: photoURL
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Известный выпускник успешно создан')
})
