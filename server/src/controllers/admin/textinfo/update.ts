import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const fields = Object.keys(req.body) as string[]
    const page = req.query.page as string

    for (const name of fields) {
        const object = {
            page,
            name,
            content: req.body[name].toString()
        }

        await textService.createOrUpdate({ where: { name } }, object)
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Текстовые данные успешно обновлены')
})