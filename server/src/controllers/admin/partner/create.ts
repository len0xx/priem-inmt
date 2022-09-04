import partnerService from '../../../services/partner.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_PARTNERS_AMOUNT = 30

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, logo } = req.body
    const amount = await partnerService.count()

    if (amount >= MAX_PARTNERS_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество партнёров (${ MAX_PARTNERS_AMOUNT }). Чтобы создать нового, необходимо удалить один из существующих`)
    }

    let logoURL: string
    if (+logo && !isNaN(+logo)) {
        const file = await documentService.getById(+logo)
        logoURL = file ? file.src : undefined
    }

    const partner = await partnerService.create({
        name: name,
        logo: logoURL
    })

    const response = {
        message: 'Партнер института успешно создан',
        partner
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
