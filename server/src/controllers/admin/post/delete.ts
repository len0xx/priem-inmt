import postService from '../../../services/post.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const del = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    await postService.deleteById(id)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Публикация успешно удалена')
})
