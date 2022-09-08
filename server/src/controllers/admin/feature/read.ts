import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { WhereOptions } from 'sequelize'


export const readAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const type = req.query.type
    const options: WhereOptions = type ? { where: { type } } : {}
    options.order = [ [ 'id', 'ASC' ] ]

    const features = await featureService.get(options)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { features })

})

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const feature = await featureService.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { feature })
})