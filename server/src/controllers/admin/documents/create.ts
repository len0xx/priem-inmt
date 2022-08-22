import documentService from '../../../services/document.js'
import { catchHTTPErrors, generateStaticFilePath, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request & { file: { extension: string } }, res: Response) => {
    const { title } = req.body
    const src = generateStaticFilePath(req.file.filename)

    const result = await documentService.create( {
        title,
        extension: req.file.extension,
        src: src
    } )

    const response = {
        message: 'Документ успешно загружен',
        document: result
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})