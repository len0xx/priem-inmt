import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'
import dotenv from 'dotenv'

dotenv.config()

export const get: RequestHandler = async (event) => {
    const { token } = cookie.parse(event.request.headers.get('cookie') || '')
    try {
        // const user = jwt.verify(token, process.env.SECRET) as Record<any, any>;
        return {
            status: 200,
            body: token
        }
    } catch {
        // invalid or expired token
    }
}
