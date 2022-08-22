import educationalProgramService from '../../../services/educationalProgram.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import { Op } from 'sequelize'

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const program = await educationalProgramService.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { program })
})

export const getAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const degree = req.query.degree

    const getProgramsWhereDegree = async (degree: string) => {
        const programs = await educationalProgramService.findAll({
            where: {
                degree: degree
            }
        })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { programs })
    }

    if (degree === 'bachelor') {
        getProgramsWhereDegree('Бакалавриат')
    } else if (degree == 'specialist') {
        getProgramsWhereDegree('Специалитет')
    } else if (degree == 'master') {
        getProgramsWhereDegree('Магистратура')
    } else if (degree == 'bachspec') {
        const programs = await educationalProgramService.findAll({
            where: {
                degree: {
                    [Op.or]: ['Бакалавриат', 'Специалитет']
                }
            }
        })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { programs })
    } else {
        const programs = await educationalProgramService.get()
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { programs })
    }
})
