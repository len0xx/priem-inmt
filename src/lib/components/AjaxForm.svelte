<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { sendWindowAJAX } from '../utilities'
    import type { RESTMethod } from '../../types'

    export let id: string = undefined
    export let action = ''
    export let className = ''
    export let csrfToken = ''
    export let noReset = false
    export let checkOk = true
    export let bitrix = false
    export let method: RESTMethod = 'POST'

    const dispatch = createEventDispatcher()

    const handleSubmit = (e: Event) => {
        let formData = new FormData(e.target as HTMLFormElement)
        if (bitrix) {
            const formOrigin = formData
            formData = new FormData()
            const fio = formOrigin.get('fio')
            const words = fio.toString().split(' ')
            let [firstname, lastname] = ['', '-']
            if (words.length) lastname = words[0]
            if (words.length > 1) firstname = words[1]
            const vals = {
                CONTACT_NAME: [firstname],
                CONTACT_EMAIL: [formOrigin.get('email')],
                CONTACT_PHONE: [formOrigin.get('phone')],
                CONTACT_LAST_NAME: [lastname],
                DEAL_COMMENTS: [formOrigin.get('message')]
            }
            formData.append('values', JSON.stringify(vals))
            formData.append('properties', '{}')
            formData.append('consents', '{"AGREEMENT_8":"Y"}')
            formData.append('recaptcha', 'undefined')
            formData.append('timeZoneOffset', '-300')
            formData.append('id', '28')
            formData.append('sec', 'wbu85c')
            formData.append('lang', 'ru')
            formData.append('trace', '{"url":"https://inmt-priem.urfu.ru/","device":{"isMobile":false},"tags":{"ts":1649833527,"list":{},"gclid":null},"client":{},"pages":{"list":[["https://inmt-priem.urfu.ru/",1650616161,"Институт новых материалов и технологий"]]},"gid":null,"previous":{"list":[]},"channels":[{"code":"button","value":10}]}')
            formData.append('entities', '[]')
            formData.append('security_sign', 'undefined')
        }
        const requestOptions = {
            method,
            data: formData,
            csrfToken
        }

        sendWindowAJAX(
            action,
            requestOptions,
            (res) => {
                if (checkOk) {
                    if (res.ok === true) {
                        dispatch('success', res)
                    }
                    else if (res.ok === false) {
                        dispatch('error', { error: res })
                    }
                }
                else {
                    dispatch('success', res)
                }
                if (!noReset) (e.target as HTMLFormElement).reset()
            },
            (res) => { dispatch('error', { error: res }) }
        )
    }
</script>

<form {id} class={className} {action} {method} on:submit|preventDefault={handleSubmit}>
    <slot />
</form>
