import textService from '../../../services/text.js'
import { catchHTTPErrors, HTTPResponse } from '../../../utilities.js'
import { HTTPStatus } from '../../../types/enums.js'
import type { Request, Response } from 'express'
import { generateHTML } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Heading } from '@tiptap/extension-heading'
import { HardBreak } from '@tiptap/extension-hard-break'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Image } from '@tiptap/extension-image'
import { Underline } from '@tiptap/extension-underline'
import { ListItem } from '@tiptap/extension-list-item'
import { BulletList } from '@tiptap/extension-bullet-list'
import { Link } from '@tiptap/extension-link'

export const update = catchHTTPErrors(async (req: Request, res: Response) => {
    const fields = Object.keys(req.body) as string[]
    const page = req.query.page as string

    for (const name of fields) {
        const object = {
            page,
            name,
            content: req.body[name].toString()
        }

        if (name === 'distributionFirstText') {
            const json = JSON.parse(req.body[name])
            console.log(json)
            const testHTML = generateHTML(json, [
                Text,
                Heading,
                Document,
                Paragraph,
                Underline,
                HardBreak,
                ListItem,
                BulletList,
                Italic,
                Image,
                Bold,
                Link
            ])

            console.log(testHTML)
        }

        await textService.createOrUpdate({ where: { name } }, object)
    }

    return new HTTPResponse(res, HTTPStatus.SUCCESS, 'Текстовые данные успешно обновлены')
})