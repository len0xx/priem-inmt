import dormitoryService from '../../../services/dormitory.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { DormitoryI } from '../../../models/dormitory.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { img, title, address } = req.body
    const newData: DormitoryI = { img, title, address }
    await dormitoryService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Общежитие успешно обновлено')
})