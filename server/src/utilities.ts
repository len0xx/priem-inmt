import type { CookieOptions, Response as ExpressResponse } from 'express'
import { ValidationError } from 'sequelize'
import type { HTTPErrorI } from './types'

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
        else this.json = { ok: !isStatusError(this.status), ...payload}

        this.parseCookies(handler)
        this.invoke(handler)
    }

    private parseCookies(handler: ExpressResponse) {
        if (this.cookies) {
            for (const key in this.cookies) {
                if (this.cookies[key].value)
                    handler.cookie(key, this.cookies[key].value, this.cookies[key].options)
                else
                    handler.clearCookie(key)
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

export const validatePassword = (password: string) => {
    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'
    const capitalLetters = [...'QWERTYUIOPASDFGHJKLZXCVBNM']
    const lowerLetters = [...letters.toLowerCase()]
    const numbers = [...'0123456789']
    const minimumLength = 6
    const maximumLength = 30

    if (password.length < minimumLength || password.length > maximumLength)
        return false

    let containsCapital = false
    capitalLetters.forEach(symbol => {
        if (password.includes(symbol)) containsCapital = true
    })

    let containsLower = false
    lowerLetters.forEach(symbol => {
        if (password.includes(symbol)) containsLower = true
    })

    let containsNumber = false
    numbers.forEach(symbol => {
        if (password.includes(symbol)) containsNumber = true
    })

    return containsCapital && containsLower && containsNumber
}
