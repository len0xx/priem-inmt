/// <reference types="@sveltejs/kit" />

import { IUser } from '../server/src/models/user'

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			token: string,
			csrf: string,
			user: IUser,
			api?: string
		}

		// interface Platform {}

		interface Session extends Locals {
			loggedIn: boolean
		}

		// interface Stuff {}
	}
}
