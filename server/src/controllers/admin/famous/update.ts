import famousService from '../../../services/famous.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { name, description, graduateYear } = req.body

    await famousService.updateById(id, {
        name: name,
        description: description,
        graduateYear: graduateYear
    })
    return new HTTPResponse(res, HTTPStatus.CREATED, 'Известный выпускник успешно обновлен')
})
