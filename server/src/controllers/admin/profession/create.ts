import professionService from '../../../services/profession.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_PROFESSIONS_AMOUNT = 12

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, description, minsalary } = req.body
    const amount = await professionService.count()

    if (amount >= MAX_PROFESSIONS_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество профессий (${ MAX_PROFESSIONS_AMOUNT }). Чтобы создать новую, необходимо удалить одну из существующих`)
    }

    const duties: string[] = []
    for (let i = 1; i <= 10; i++) {
        const duty = req.body[`duty${i}`]
        if (duty) {
            duties.push(duty)
        }
    }

    const profession = await professionService.create({ title, description, minsalary, duties })

    const response = {
        message: 'Профессия успешно создана',
        profession
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
