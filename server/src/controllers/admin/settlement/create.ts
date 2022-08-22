import settlementResponsible from '../../../services/settlementResponsible.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, label, address, auditory, phone, email } = req.body

    await settlementResponsible.create({
        name: name,
        label: label,
        address: address,
        auditory: auditory,
        phone: phone,
        email: email
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Ответственный за поселение успешно создан')
})
