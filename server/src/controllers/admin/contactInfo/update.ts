import contactInfoService from '../../../services/contactInfo.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { ContactInfoI } from '../../../models/contactInfo.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const { tel, email, directorateAddress, admissionsAddress, vkUrl, tgUrl } = req.body
    const newData: ContactInfoI = { id: 1, tel, email, directorateAddress, admissionsAddress, vkUrl, tgUrl }

    if (await contactInfoService.getById(1)) await contactInfoService.update({ where: { id: 1 } }, newData)
    else await contactInfoService.create(newData)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Контактные данные успешно обновлены')
})