import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const texts = await textService.get()
    for (const text of texts) {
        const name = req.body[`name${text.id}`]
        const content = req.body.content
        const data = await textService.getByName(name)
        data?.update({ content })
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Текстовые элементы успешно обновлены')
})