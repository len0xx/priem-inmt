import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const AMOUNT_LIMITS = {
    bachelor: 6,
    master: 6,
    main: 4,
    specialist: 4,
    instInfo: 4
}

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body
    const type = req.query.type.toString()
    const amount = await featureService.count()

    if (amount >= AMOUNT_LIMITS[type]) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество перечислений (${ AMOUNT_LIMITS[type] }). Чтобы создать новое, необходимо удалить одно из существующих`)
    }

    const feature = await featureService.create({ title, description, type })

    const response = {
        message: 'Перечисление успешно создано',
        feature
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
