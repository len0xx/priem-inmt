import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body
    const type = req.query.type.toString()

    const feature = await featureService.create({ title, description, type })

    const response = {
        message: 'Перечисление успешно создано',
        feature
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
