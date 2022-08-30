import fs from 'fs/promises'
import path from 'path'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const del = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const document = await documentService.getById(id)
    await documentService.deleteById(id)

    // Удаляем файл из файловой системы на компьютере (для этого лучше использовать абсолютный путь)
    const __dirname = req.app.get('dir')
    const filePath = path.join(__dirname, document.src)
    await fs.unlink(filePath)

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Документ удалён')
})