import documentService from '../../../services/document.js'
import { catchHTTPErrors, generateStaticFilePath, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const AMOUNT_LIMITS = {
    video: 4,
    docAccommodation: 10,
    docBachelor: 10
}

export const create = catchHTTPErrors(async (req: Request & { file: { extension: string } }, res: Response) => {
    const { title } = req.body
    const type = req.query.type.toString() || 'media'
    const src = generateStaticFilePath(req.file.filename)
    const finalTitle = title || req.file.filename

    if (Object.keys(AMOUNT_LIMITS).includes(type)) {
        const amount = await documentService.count({ where: { type } })

        if (amount >= AMOUNT_LIMITS[type]) {
            return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество загружаемых файлов (${ AMOUNT_LIMITS[type] }). Чтобы загрузить новый, необходимо удалить один из существующих`)
        }
    }

    const result = await documentService.create({
        title: finalTitle,
        extension: req.file.extension,
        src,
        type,
        size: req.file.size
    })

    const response = {
        message: 'Файл успешно загружен',
        document: result
    }
    return new HTTPResponse(res, HTTPStatus.CREATED, response)

})