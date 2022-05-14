/// <reference types="@sveltejs/kit" />

import { User } from '../server/src/models/user'

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
	}

	// interface Platform {}

	interface Session {
		loggedIn: boolean,
		token: string,
		csrf: string,
		user: User
	}

	// interface Stuff {}
}
