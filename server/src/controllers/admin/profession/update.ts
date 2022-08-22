import professionService from '../../../services/profession.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { ProfessionI } from '../../../models/profession.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { title, description, minsalary, duties } = req.body
    const newData: ProfessionI = { title, description, minsalary, duties }
    await professionService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Профессия успешно обновлена')
})