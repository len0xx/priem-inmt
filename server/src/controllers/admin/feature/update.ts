import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { title, description } = req.body

    await featureService.updateById(id, {
        title: title,
        description: description
    })

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Перечисление успешно обновлено')
})
