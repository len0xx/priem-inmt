import featureService from '../../../services/feature.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

enum Page {
    Bachelor = 'bachelor',
    Master = 'master',
    Main = 'main',
}

export const get = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const feature = await featureService.getById(id)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, { feature })
})

export const getAll = catchHTTPErrors(async (req: Request, res: Response) => {
    const page = req.query.page

    const getFeaturesWherePage = async (page: string) => {
        const features = await featureService.findAll({
            where: {
                page: page
            }
        })
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { features })
    }

    if (page === Page.Bachelor) {
        getFeaturesWherePage(Page.Bachelor)
    } else if (page == Page.Master) {
        getFeaturesWherePage(Page.Master)
    } else if (page === Page.Main) {
        getFeaturesWherePage(Page.Main)
    } else {
        const features = await featureService.get()
        return new HTTPResponse(res, HTTPStatus.SUCCESS, { features })
    }
})