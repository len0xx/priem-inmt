import opportunityService from '../../../services/opportunity.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_OPPORTUNITIES_AMOUNT = 10

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description } = req.body
    const amount = await opportunityService.count()

    const opportunity = await opportunityService.create( { title, description } )

    if (amount >= MAX_OPPORTUNITIES_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество возможностей (${ MAX_OPPORTUNITIES_AMOUNT }). Чтобы создать новую, необходимо удалить одну из существующих`)
    }

    const response = {
        message: 'Возможность успешно создана',
        opportunity
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})