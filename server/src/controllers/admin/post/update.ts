import postService from '../../../services/post.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import type { PostI } from '../../../models/post.js'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const id = +req.params.id
    const { img, title, text } = req.body
    const links: { text: string, url: string }[] = []

    for (let i = 1; i <= 5; i++) {
        const text = req.body[`link_text${i}`]
        const url = req.body[`link_url${i}`]
        if (url !== undefined && text !== undefined) {
            links.push({ url, text })
        }
    }

    let imgURL = undefined
    if (img) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const newData: PostI = { title, text, links, img: imgURL }
    await postService.updateById(id, newData)
    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Публикация успешно обновлена')
})
