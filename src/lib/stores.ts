import { readable } from 'svelte/store'

export const formEndpoint = readable('https://fgaouvo.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.site.form.fill')
