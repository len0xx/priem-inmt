import contactInfoService from '../../../services/contactInfo.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { ContactInfoI } from '../../../models/contactInfo.js'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { tel, email, directorateAddress, admissionsAddress } = req.body
    const links: { text: string, url: string }[] = []

    for (let i = 1; i <= 5; i++) {
        const text = req.body[`link_text${i}`]
        const url = req.body[`link_url${i}`]
        if (url && text) {
            links.push({ url, text })
        }
    }

    const newData: ContactInfoI = { tel, email, directorateAddress, admissionsAddress, links }

    await contactInfoService.create(newData)

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Контактные данные успешно сохранены')
})