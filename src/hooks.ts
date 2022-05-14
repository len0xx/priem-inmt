import cookie from 'cookie'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { v4 as uuid } from '@lukeed/uuid'
import type { Handle } from '@sveltejs/kit'

dotenv.config()

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	const response = await resolve(event)

	if (!cookies.csrf) {
		// if this is the first time the user has visited this app, set a csrf cookie
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

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(event) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	event.locals.token = cookies.token
	event.locals.csrf = cookies.csrf
	event.locals.user = null

	if (event.locals.token) {
		try {
			const decode = jwt.verify(event.locals.token, process.env.SECRET) as Record<string, string>
	
			const body = {
				token: event.locals.token,
				id: decode.id
			}
	
			const headers = {
				'X-API-Key': process.env.API_KEY
			}

			// TODO: Add a header with a public key
			const axiosResponse = await axios({method: 'post', url: 'http://localhost:3000/api/user-info', data: body, headers})
			const response = axiosResponse.data
	
			if (response.ok) {
				event.locals.user = response.user
			}
		}
		catch {
			// do nothing
		}
	}


	return {
		loggedIn: !!cookies.token,
		token: event.locals.token,
		csrf: event.locals.csrf,
		user: event.locals.user
	}
}
