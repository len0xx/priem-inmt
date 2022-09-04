import postService from '../../../services/post.js'
import documentService from '../../../services/document.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'

const MAX_POSTS_AMOUNT = 10

export const create = catchHTTPErrors(async (req: Request, res: Response) => {
    const { img, title, text } = req.body
    const amount = await postService.count()

    if (amount >= MAX_POSTS_AMOUNT) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, `Превышено максимальное количество публикаций (${ MAX_POSTS_AMOUNT }). Чтобы создать новую публикацию, необходимо удалить одну из существующих`)
    }

    if (!title || !text) {
        return new HTTPResponse(res, HTTPStatus.BAD_REQUEST, 'Поля Название и Текст являются обязательными')
    }

    const links: { text: string, url: string }[] = []

    for (let i = 1; i <= 5; i++) {
        const text = req.body[`link_text${i}`]
        const url = req.body[`link_url${i}`]
        if (url !== undefined && text !== undefined) {
            links.push({ url, text })
        }
    }

    let imgURL: string
    if (+img && !isNaN(+img)) {
        const file = await documentService.getById(+img)
        imgURL = file ? file.src : undefined
    }

    const post = await postService.create({ title, text, links, img: imgURL })

    const response = {
        message: 'Публикация успешно создана',
        post
    }

    return new HTTPResponse(res, HTTPStatus.CREATED, response)
})
