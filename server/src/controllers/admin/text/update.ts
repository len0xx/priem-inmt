import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, content } = req.body
    const text = await textService.getByName(name)
    text?.update({ content })
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Текстовый элемент успешно обновлен')
})