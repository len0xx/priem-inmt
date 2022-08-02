import { readable, writable } from 'svelte/store'

export const formEndpoint = readable('https://fgaouvo.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.site.form.fill')

export const modal = writable<{ open: () => void, close: () => void }>(undefined)

export const mobileMenu = writable<{ open: () => void, close: () => void }>(undefined)

export const commonHeaderState = writable(false);