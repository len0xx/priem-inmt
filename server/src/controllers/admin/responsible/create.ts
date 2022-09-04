import responsibleService from '../../../services/responsible.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_CONTACTS_AMOUNT = 4

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { name, label, phone, email, img } = req.body
    const amount = await responsibleService.count()

    if (amount >= MAX_CONTACTS_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество контактов (${ MAX_CONTACTS_AMOUNT }). Чтобы создать новый, необходимо удалить один из существующих`)
    }

    let imgURL: string
    if (+img && !isNaN(+img)) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const responsible = await responsibleService.create({
        name,
        label,
        phone,
        email,
        img: imgURL
    })

    const response = {
        message: 'Ответственное лицо успешно создано',
        responsible
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
