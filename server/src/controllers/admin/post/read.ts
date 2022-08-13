import postService from '../../../services/post.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = async (_: Request, res: Response) => {
    try {
        const posts = await postService.getAll()

        return new HTTPResponse(res, HTTPStatus.CREATED, { posts })
    }
    catch (e) {
        console.error(e)
        const { code, message } = getErrorDetails(e)
        return new HTTPResponse(res, code, message)
    }
}

export const readOne = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id

        const post = await postService.get(id)

        return new HTTPResponse(res, HTTPStatus.CREATED, { post })
    }
    catch (e) {
        console.error(e)
        const { code, message } = getErrorDetails(e)
        return new HTTPResponse(res, code, message)
    }
}
