import settlementResponsible from '../../../services/settlementResponsible.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { name, label, address, auditory, phone, email } = req.body

    await settlementResponsible.updateById(id, {
        name: name,
        label: label,
        address: address,
        auditory: auditory,
        phone: phone,
        email: email
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Ответственный за поселение успешно обновлен')
})
