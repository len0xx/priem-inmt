import graduateService from '../../../services/graduate.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { name, description, graduateYear, photo } = req.body

    let photoURL = undefined
    if (photo) {
        const file = await documentService.getById(+photo)
        photoURL = file.src
    }

    // TODO: Delete all console.logs
    console.log(`Img from FORM: ${Boolean(photo)}, photoURL: ${photoURL}`)

    await graduateService.updateById(id, {
        name: name,
        description: description,
        graduateYear: graduateYear,
        photo: photoURL
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Известный выпускник успешно обновлен')
})
