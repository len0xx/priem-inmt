<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ session }) => {
        return {
            props: {
                csrfToken: session.csrf
            }
        }
    }
</script>

<script lang="ts">
    import { Button, AjaxForm } from '$components'
    import { redirect } from '$lib/utilities'
    import { slide } from 'svelte/transition'

    let success = false
    let errorText = ''

    export let csrfToken = ''

    const handleSuccess = () => {
        success = true
        redirect('/admin-panel/main')
    }

    const handleError = (event: CustomEvent) => {
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>Авторизация</title>
</svelte:head>

<div class="white-block authorization-block">
    <h2>Войдите в свой аккаунт</h2>
    <AjaxForm action="/api/auth/login" method="POST" on:success={ handleSuccess } on:error={ handleError } {csrfToken}>
        { #if success }
            <p transition:slide={{ duration: 200 }} class="success">Вход успешен</p>
        { :else if errorText }
            <p transition:slide={{ duration: 200 }} class="error">{ errorText }</p>
        {/if }
        <label for="email">Email:</label><br>
        <input class="form-control" type="email" name="email" required><br>
        <label for="password">Пароль:</label><br>
        <input class="form-control" type="password" name="password" required><br>
        <br />
        <div class="align-center">
            <Button variant="primary">Войти</Button>
        </div>
    </AjaxForm>
</div>
