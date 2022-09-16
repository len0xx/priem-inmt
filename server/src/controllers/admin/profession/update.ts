import professionService from '../../../services/profession.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { IProfession } from '../../../models/profession.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { title, description, minsalary } = req.body

    const duties: string[] = []

    for (let i = 1; i <= 10; i++) {
        const duty = req.body[`duty${i}`]
        if (duty) {
            duties.push(duty)
        }
    }

    const newData: IProfession = { title, description, minsalary, duties }
    await professionService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Профессия успешно обновлена')
})