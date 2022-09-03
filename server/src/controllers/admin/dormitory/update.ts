import dormitoryService from '../../../services/dormitory.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { DormitoryI } from '../../../models/dormitory.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { img, title, address } = req.body

    let imgURL: string
    if (img) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const newData: DormitoryI = { img: imgURL, title, address }
    await dormitoryService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Общежитие успешно обновлено')
})