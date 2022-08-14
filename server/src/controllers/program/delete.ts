import educationalProgramService from '../../services/educationalProgram.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import { HTTPStatus } from '../../types/enums.js'
import type { Request, Response } from 'express'

export const del = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        await educationalProgramService.deleteById(id)
        return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Образовательная программа успешно удалена')
    }
    catch (err) {
        console.error(err)
        const { code, message } = getErrorDetails(err)
        return new HTTPResponse(res, code, message)
    }
}
