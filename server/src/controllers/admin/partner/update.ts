import partnerService from '../../../services/partner.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { name, logo } = req.body

    let logoURL = undefined
    if (logo) {
        const file = await documentService.getById(+logo)
        logoURL = file.src
    }

    await partnerService.updateById(id, {
        name: name,
        logo: logoURL
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Партнер института успешно обновлен')
})
