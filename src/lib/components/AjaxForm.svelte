<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { sendWindowAJAX } from '../utilities'
    import type { RESTMethod } from '../types'

    export let action = ''
    export let className = ''
    export let csrfToken = ''
    export let noReset = false
    export let checkOk = true
    export let method: RESTMethod = 'POST'

    const dispatch = createEventDispatcher()

    const handleSubmit = (e) => {
        const formData = new FormData(e.target)
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
                        dispatch('error', res)
                    }
                }
                else {
                    dispatch('success', res)
                }
                if (!noReset) (e.target).reset()
            },
            (res) => { dispatch('error', res) }
        )
    }
</script>

<form class={className} {action} {method} on:submit|preventDefault={handleSubmit}>
    <slot></slot>
</form>
