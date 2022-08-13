import postService from '../../../services/post.js'
import { getErrorDetails, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

export const create = async (req: Request, res: Response) => {
    try {
        const { title, text } = req.body

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
    }
    catch (e) {
        console.error(e)
        const { code, message } = getErrorDetails(e)
        return new HTTPResponse(res, code, message)
    }
}
