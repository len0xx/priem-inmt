import postService from '../../../services/post.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const del = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id

        await postService.delete(id)

        return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Публикация успешно удалена')
    }
    catch (e) {
        console.error(e)
        const { code, message } = getErrorDetails(e)
        return new HTTPResponse(res, code, message)
    }
}
