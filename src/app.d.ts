/// <reference types="@sveltejs/kit" />

import { UserI } from '../server/src/models/user'

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			token: string,
			csrf: string,
			user: UserI
		}

		// interface Platform {}

		interface Session extends Locals {
			loggedIn: boolean
		}

		// interface Stuff {}
	}
}
