import dormitoryService from '../../../services/dormitory.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_DORMS_AMOUNT = 8

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { img, title, address } = req.body
    const amount = await dormitoryService.count()

    if (amount >= MAX_DORMS_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество общежитий (${ MAX_DORMS_AMOUNT }). Чтобы создать новое общежитие, необходимо удалить одно из существующих`)
    }

    let imgURL: string
    if (+img && !isNaN(+img)) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const dormitory = await dormitoryService.create( { img: imgURL, title, address } )

    const response = {
        message: 'Общежитие успешно создано',
        dormitory
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})