import responsibleService from '../../../services/responsible.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { name, label, phone, email } = req.body

    await responsibleService.updateById(id, {
        name: name,
        label: label,
        phone: phone,
        email: email
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Ответственное лицо успешно обновлено')
})
