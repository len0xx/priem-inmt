import educationalProgramService from '../../services/educationalProgram.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import type { Request, Response } from 'express'
import { HTTPStatus } from '../../types/enums.js'

export const del = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        await educationalProgramService.delete(id)
        return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Образовательная программа успешно удалена')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
