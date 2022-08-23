import documentService from '../../../services/document.js'
import { catchHTTPErrors, generateStaticFilePath, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request & { file: { extension: string } }, res: Response) => {
    const { title } = req.body
    const type = req.query.type.toString() || 'media'
    const src = generateStaticFilePath(req.file.filename)
    const finalTitle = title || req.file.filename

    const result = await documentService.create( {
        title: finalTitle,
        extension: req.file.extension,
        src,
        type,
        size: req.file.size
    } )

    const response = {
        message: 'Документ успешно загружен',
        document: result
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})