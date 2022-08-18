import responsibleService from '../../../services/responsible.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const get = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const responsible = await responsibleService.getById(id)

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { responsible })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}

export const getAll = async (_: Request, res: Response) => {
    try {
        const responsibles = await responsibleService.get()

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { responsibles })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
