import postService from '../../../services/post.js'
import { catchHTTPErrors, HTTPError, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { title, text } = req.body

    if (!title || !text)
        throw new HTTPError(HTTPStatus.BAD_REQUEST, 'Поля Название и Текст являются обязательными')

    const links: { text: string, url: string }[] = []

    for (let i = 1; i <= 5; i++) {
        const text = req.body[`link_text${i}`]
        const url = req.body[`link_url${i}`]
        if (url !== undefined && text !== undefined) {
            links.push({ url, text })
        }
    }

    await postService.create({ title, text, links })

    return new HTTPResponse(res, HTTPStatus.CREATED, 'Публикация успешно создана')
})
