import rentInfoService from '../../../services/rentInfo.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { RentInfoI } from '../../../models/rentInfo.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const { heading, subheading, text, tel1, tel2, linkText, linkURL } = req.body
    const newData: RentInfoI = { id: 1, heading, subheading, text, tel1, tel2, linkText, linkURL }

    if (await rentInfoService.getById(1)) await rentInfoService.update({ where: { id: 1 } }, newData)
    else await rentInfoService.create(newData)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Информация об альтернативном поселении успешно обновлена')
})