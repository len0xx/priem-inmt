import contactInfoService from '../../../services/contactInfo.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = async (_: Request, res: Response) => {
    try {
        const contactInfo = await contactInfoService.getById()

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { contactInfo })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}