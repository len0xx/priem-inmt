import educationalProgramService from '../../../services/educationalProgram.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type EducationalProgram from '../../../models/educationalProgram.js'

export const del = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const deletePartner = req.query?.partner

    if (deletePartner) {
        const program: EducationalProgram = await educationalProgramService.getById(id)
        const oldPartners = program.partners
        const newPartners = oldPartners.filter(partner => partner !== deletePartner)
        program.partners = newPartners
        await educationalProgramService.updateById(id, program)
        return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Логотип партнера успешно удален')
    }
    await educationalProgramService.deleteById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Образовательная программа успешно удалена')
})
