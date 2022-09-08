import educationalProgramService from '../../../services/educationalProgram.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import { Op } from 'sequelize'
import type { FindOptions } from 'sequelize'

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const program = await educationalProgramService.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { program })
})

export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    let degree = req.query.degree

    if (degree === 'bachelor') {
        degree = 'Бакалавриат'
    } else if (degree === 'master') {
        degree = 'Магистратура'
    } else if (degree === 'specialist') {
        degree = 'Специалитет'
    }

    const options: FindOptions = degree ? { where: { degree } } : {}
    options.order = [ [ 'id', 'ASC' ] ]

    if (degree === 'bachspec') {
        const programs = await educationalProgramService.findAll({
            where: {
                degree: {
                    [Op.or]: ['Бакалавриат', 'Специалитет']
                }
            }
        })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { programs })
    }

    const programs = await educationalProgramService.get(options)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, { programs })
})
