import professionService from '../../../services/profession.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {

    const { title, description, minsalary } = req.body

    const duties: string[] = []

    for (let i = 1; i <= 10; i++) {
        const duty = req.body[`duty${i}`]
        if (duty !== undefined) {
            duties.push(duty)
        }
    }

    await professionService.create({ title, description, minsalary, duties })

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Профессия успешно создана')
})
