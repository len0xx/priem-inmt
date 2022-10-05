import { MulterError } from 'multer'
import { ValidationError } from 'sequelize'
import bcrypt from 'bcrypt'
import { HTTPStatus } from './types/enums.js'
import type { CookieOptions, Response as ExpressResponse, Request, NextFunction } from 'express'
import type { HTTPErrorI } from './types'
import type { JSONContent, Extensions } from '@tiptap/core';
import { generateHTML } from '@tiptap/html'
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

export class HTTPError extends Error implements HTTPErrorI {
    public readonly code: number

    constructor(code: number, message: string) {
        super(message)
        this.code = code
        this.name = 'HTTPError'
    }
}

export const isStatusSuccess = (status: number) => status >= 200 && status < 300

export const isStatusRedirect = (status: number) => status >= 300 && status < 400

export const isStatusError = (status: number) => status >= 400 && status < 600

export type CookieList = Record<
    string,
    { value: string | null, options?: CookieOptions }
>

export const getErrorDetails = (error: Error) => {
    const code = error instanceof HTTPError ? error.code : 400

    let message = error.toString()
    if (error instanceof ValidationError) {
        const needles = ['Violation:', 'Validation error:', 'notNull']
        const msg = error.message
        let messages = msg.split('\n')
        messages = messages.map(
            theMsg => {
                let newMsg = theMsg
                needles.forEach(needle => newMsg = newMsg.replace(needle, ''))
                return newMsg
            }
        )
        message = messages[0]
        if (message.endsWith(',')) message = message.slice(0, message.length - 1)
        message = message.trim()
    }
    else if (error instanceof Error) {
        message = error.message
    }

    return { code, message }
}

export type ResponsePayload = string | Record<string, unknown>

export class HTTPResponse {
    public readonly status: number
    private readonly json?: Record<string, unknown>
    private readonly cookies?: CookieList
    private readonly redirect?: string

    constructor(handler: ExpressResponse, status: number, payload?: ResponsePayload, cookies?: CookieList) {
        this.status = status

        if (cookies !== undefined) this.cookies = cookies

        if (typeof payload === 'string') {
            if (isStatusRedirect(this.status)) {
                this.redirect = payload
            }
            else if (isStatusError(this.status)) {
                this.json = { ok: false, error: payload }
            }
            else if (payload.length) {
                this.json = { ok: true, message: payload }
            }
            else {
                this.json = { ok: true }
            }
        }
        else this.json = { ok: !isStatusError(this.status), ...payload }

        this.parseCookies(handler)
        this.invoke(handler)
    }

    private parseCookies(handler: ExpressResponse) {
        if (this.cookies) {
            for (const key in this.cookies) {
                if (this.cookies[key].value)
                    handler.cookie(key, this.cookies[key].value, this.cookies[key].options)
                else
                    handler.clearCookie(key, { path: '/' }) // Doesn't work without "{ path: '/' }"
            }
        }
    }

    private invoke(handler: ExpressResponse) {
        if (isStatusRedirect(this.status)) {
            handler.redirect(this.status, this.redirect)
        }
        else
            handler.status(this.status).json(this.json)
    }
}

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10)

export const comparePasswords = bcrypt.compareSync

export const generateFileName = (file: Express.Multer.File, extension: string | undefined) => {
    const hash = crypto.randomUUID().split('-')
    const salt = hash[0]
    const num = Math.floor((Math.random() * 100) / 7)

    return file.fieldname + salt + num.toString() + (extension ? '.' + extension : '')
}

export const errorHandler = <ErrorType extends Error>(err: ErrorType, _req: Request, res: ExpressResponse, next: NextFunction) => {
    if (res.headersSent) {
        next(err)
        return
    }

    const code = err instanceof HTTPError ? err.code : HTTPStatus.INTERNAL_ERROR
    let errorText = err.message || err.toString()

    if (err instanceof MulterError && err.message === 'File too large') {
        errorText = 'Файл имеет слишком большой объём. Пожалуйста, выберите файл меньшего объёма'
    }

    return new HTTPResponse(res, code, errorText)
}

export const catchHTTPErrors = (action: (req: Request, res: ExpressResponse, next?: NextFunction) => Promise<HTTPResponse>) => {
    return async (req: Request, res: ExpressResponse, next?: NextFunction) => {
        try {
            return await action(req, res, next)
        }
        catch (err) {
            console.error(err)
            const { code, message } = getErrorDetails(err)
            return new HTTPResponse(res, code, message)
        }
    }
}

export const generateStaticFilePath = (filename: string) => `/static/${filename}`

export const defaultSort = <T>(a: T, b: T) => {
    if (a < b) return -1
    else if (a > b) return 1
    return 0
}

export const sortByIdAsc = <T extends { id: number }>(a: T, b: T) => {
    if (a.id < b.id) return -1
    else if (a.id > b.id) return 1
    return 0
}

export const sortByIdDesc = <T extends { id: number }>(a: T, b: T) => {
    if (a.id > b.id) return -1
    else if (a.id < b.id) return 1
    return 0
}

export const generateTipTapHTML = (value: string) => {
    const extensions = [
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
    ]

    const json = JSON.parse(value)
    return generateHTML(json, extensions)
}