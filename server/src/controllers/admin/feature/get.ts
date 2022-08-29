import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Type {
    Bachelor = 'bachelor',
    InstInfo = 'instInfo',
    Main = 'main',
    Master = 'master'
}

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const feature = await featureService.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { feature })
})

export const getAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const type = req.query.type

    const getByType = async (type: string) => {
        const features = await featureService.findAll({ where: { type } })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { features })
    }

    if (type === Type.Bachelor) getByType(Type.Bachelor)
    else if (type === Type.InstInfo) getByType(Type.InstInfo)
    else if (type === Type.Main) getByType(Type.Main)
    else if (type == Type.Master) getByType(Type.Master)
    else {
        const features = await featureService.get()
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { features })
    }
})