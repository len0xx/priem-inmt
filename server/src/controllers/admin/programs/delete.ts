import educationalProgramService from '../../../services/educationalProgram.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type EducationalProgram from '../../../models/educationalProgram.js'

export const del = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const deletePartner = req.query?.partner
    console.log(deletePartner)

    if (deletePartner) {
        const program: EducationalProgram = await educationalProgramService.getById(id)
        const oldPartners = program.partners
        console.log(oldPartners)
        const newPartners = oldPartners.filter(partner => partner !== deletePartner)
        console.log(newPartners)
        program.partners = newPartners
        await educationalProgramService.update({ where: { id } }, { partners: newPartners })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Логотип партнера успешно удален')
    }
    await educationalProgramService.deleteById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Образовательная программа успешно удалена')
})
