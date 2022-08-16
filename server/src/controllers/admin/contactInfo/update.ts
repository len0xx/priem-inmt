import contactInfoService from '../../../services/contactInfo.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const update = async (req: Request, res: Response) => {
    try {
        const { tel, email, directorateAddress, admissionsAddress, vkUrl, tgUrl } = req.body

        const newData = { id: 1, tel, email, directorateAddress, admissionsAddress, vkUrl, tgUrl }
        if (await contactInfoService.getById(1)) await contactInfoService.update({ where: { id: 1 } }, newData)
        else await contactInfoService.create(newData)

        return new HTTPResponse(res, HTTPStatus.SUCCESS, newData)
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}