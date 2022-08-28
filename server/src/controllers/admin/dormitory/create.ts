import dormitoryService from '../../../services/dormitory.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { img, title, address } = req.body

    let imgURL = undefined
    if (img) {
        const file = await documentService.getById(+img)
        imgURL = file.src
    }

    const dormitory = await dormitoryService.create( { img: imgURL, title, address } )

    const response = {
        message: 'Общежитие успешно создано',
        dormitory
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})