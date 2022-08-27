import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const fields = Object.keys(req.body) as string[]
    const page = req.query.page as string

    for (const field of fields) {
        const object = {
            page,
            name: field,
            content: req.body[field] as string
        }

        await textService.createOrUpdate({ where: { name: field } }, object)
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Текстовые данные успешно обновлены')
})