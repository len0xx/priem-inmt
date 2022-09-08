import postService from '../../../services/post.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const readAll = catchHTTPErrors(async (_: Request, res: Response) => {
    const posts = await postService.get({ order: [ [ 'id', 'ASC' ] ] })
    return new HTTPResponse(res, HTTPStatus.CREATED, { posts })
})

export const read = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const post = await postService.getById(id)
    return new HTTPResponse(res, HTTPStatus.CREATED, { post })
})
