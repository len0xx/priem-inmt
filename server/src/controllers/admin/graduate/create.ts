import graduateService from '../../../services/graduate.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_GRADS_AMOUNT = 30

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, description, photo } = req.body
    const amount = await graduateService.count()

    if (amount >= MAX_GRADS_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество выпускников (${ MAX_GRADS_AMOUNT }). Чтобы создать нового выпускника, необходимо удалить одного из существующих`)
    }

    let photoURL: string
    if (+photo && !isNaN(+photo)) {
        const file = await documentService.getById(+photo)
        photoURL = file ? file.src : undefined
    }

    const graduate = await graduateService.create({
        name,
        description,
        photo: photoURL
    })

    const response = {
        message: 'Известный выпускник успешно создан',
        graduate
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
