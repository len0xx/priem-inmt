import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse, generateTipTapHTML } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const tipTaps = [
    'orderMedicalText',
    'orderDocText',
    'orderPaymentText',
    'orderRegText',
    'distributionFirstText',
    'distributionSecondText',
    'distributionThirdText',
    'bachelorCalendarTextMain',
    'bachelorCalendarTextDescription',
    'instInfoText1',
    'instInfoText2',
    'masterCalendarTextMain',
    'masterCalendarTextDescription',
    'specialistSkills',
    'specialistOpportunities'
]

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const fields = Object.keys(req.body) as string[]
    const page = req.query.page as string

    for (const name of fields) {
        const object = {
            page,
            name,
            content: req.body[name].toString()
        }

        if (tipTaps.includes(name)) {
            const html = generateTipTapHTML(req.body[name])
            object.content = html
        }

        await textService.createOrUpdate({ where: { name } }, object)
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Текстовые данные успешно обновлены')
})