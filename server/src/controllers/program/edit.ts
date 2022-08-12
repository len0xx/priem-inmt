import educationalProgramService from '../../services/educationalProgram.js'
import { getErrorDetails, HTTPResponse } from '../../utilities.js'
import type { Request, Response } from 'express'
import { HTTPStatus } from '../../types/enums.js'

// interface TeacherI {
//     name: string,
//     caption: string,
//     phone: string,
//     email: string
// }

export const edit = async (req: Request, res: Response) => {
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
