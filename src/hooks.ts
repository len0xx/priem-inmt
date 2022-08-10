import cookie from 'cookie'
import * as dotenv from 'dotenv'
import axios from 'axios'
import { v4 as uuid } from '@lukeed/uuid'
import type { Handle, GetSession, RequestEvent } from '@sveltejs/kit'

dotenv.config()

export const handle: Handle = async ({ event, resolve }) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '')
    const response = await resolve(event)

    if (!cookies.csrf) {
        // if this is the first time the user has visited this app, set a CSRF cookie
        response.headers.set(
            'set-cookie',
            cookie.serialize('csrf', uuid(), {
                path: '/',
                httpOnly: true
            })
        )
    }

    return response
}

export const getSession: GetSession = async (event: RequestEvent & { locals: App.Locals }) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '')
    event.locals.token = cookies.token
    event.locals.csrf = cookies.csrf
    event.locals.user = null

    if (event.locals.token) {
        try {
            const HOST = event.request.headers.get('host')
            const PROTOCOL = HOST.startsWith('localhost') ? 'http' : 'https'
            const BASE_API_URL = `${PROTOCOL}://${HOST}/api`

            const headers = {
                'X-API-Key': process.env.API_KEY
            }

            // Проверяем токен пользователя
            // Если он некорректный или истёк – верификация провалится
            // Это нужно делать обязательно на Express сервере т.к. пакет JWT работает только там
            const verificationResponse = await axios({
                method: 'post',
                url: `${BASE_API_URL}/auth/verify`,
                data: { token: event.locals.token },
                headers
            })
            const verification = verificationResponse.data
            if (!verification.ok) throw new Error('Verification failed')

            const body = {
                token: event.locals.token,
                id: verification.id
            }

            // Получаем информацию о пользователе
            const axiosResponse = await axios({
                method: 'post',
                url: `${BASE_API_URL}/auth/user`,
                data: body,
                headers
            })
            const response = axiosResponse.data

            if (response.ok) {
                event.locals.user = response.user
            }
        }
        catch (e) {
            // we've got an error sadly
            // don't know what to do with it
            console.error('We\'ve got an error while fetching the session')
            console.error(e)
        }
    }

    return {
        loggedIn: !!(event.locals.token && event.locals.user),
        token: event.locals.token,
        csrf: event.locals.csrf,
        user: event.locals.user
    }
}
