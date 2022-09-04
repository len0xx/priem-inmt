import contactInfoService from '../../../services/contactInfo.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { ContactInfoI } from '../../../models/contactInfo.js'

const MAX_CONTACTS_AMOUNT = 4

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { tel, email, directorateAddress, admissionsAddress } = req.body
    const amount = await contactInfoService.count()

    if (amount >= MAX_CONTACTS_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество контактов (${ MAX_CONTACTS_AMOUNT }). Чтобы создать новый, необходимо удалить один из существующих`)
    }

    const links: { text: string, url: string }[] = []

    for (let i = 1; i <= 5; i++) {
        const text = req.body[`link_text${i}`]
        const url = req.body[`link_url${i}`]
        if (url && text) {
            links.push({ url, text })
        }
    }

    const newData: ContactInfoI = { id: 1, tel, email, directorateAddress, admissionsAddress, links }

    await contactInfoService.create(newData)

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Контактные данные успешно сохранены')
})