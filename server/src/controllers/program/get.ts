import educationalProgramService from '../../services/educationalProgram.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import { HTTPStatus } from '../../types/enums.js'
import type { Request, Response } from 'express'

export const get = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const program = await educationalProgramService.get(id)

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { program })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}

export const getAll = async (_: Request, res: Response) => {
    try {
        const programs = await educationalProgramService.getAll()

        return new HTTPResponse(res, HTTPStatus.SUCCESS, { programs })
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
