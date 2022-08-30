import documentService from '../../../services/document.js'
import { catchHTTPErrors, generateStaticFilePath, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request & { file: { extension: string } }, res: Response) => {
    const { title } = req.body
    const type = req.query.type.toString() || 'media'
    const src = generateStaticFilePath(req.file.filename)
    const finalTitle = title || req.file.filename

    const createDocument = async (resmponseMsg) => {
        const result = await documentService.create( {
            title: finalTitle,
            extension: req.file.extension,
            src,
            type,
            size: req.file.size
        } )
        const response = {
            message: resmponseMsg,
            document: result
        }
        return new HTTPResponse(res, HTTPStatus.CREATED, response)
    }

    if (type === 'video') {
        const limitVideos = 4
        let amountVideos = await documentService.count({ where: { type: 'video' } })
        const countVideos = amountVideos++

        if (countVideos < limitVideos) {
            return createDocument('Видео успешно загружено')
        }
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Превышено максимальное количество загружаемых видеозаписей')

    }
    return createDocument('Документ успешно загружен')

})