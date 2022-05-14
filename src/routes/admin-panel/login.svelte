<script context="module" lang="ts">
    export async function load({ params, fetch, session, stuff }) {
        const loggedIn = !!(session.loggedIn)

        if (loggedIn) {
            return {
                status: 302,
                redirect: '/admin-panel'
            }
        }

        return {
            props: {
                csrfToken: session.csrfToken
            }
        }
    }
</script>

<script lang="ts">
    import AjaxForm from '$lib/components/AjaxForm.svelte'
    import Button from '$lib/components/Button.svelte'
    import { redirect } from '$lib/utilities'

    let success = false
    let errorText = ''

    export let csrfToken = ''

    const handleSuccess = () => {
        success = true
        redirect('/admin-panel')
    }

    const handleError = (event: CustomEvent) => {
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>Авторизация</title>
</svelte:head>

<section class="white-block">
    <h1>Войдите в свой аккаунт</h1>
    <AjaxForm action="/api/auth/login" method="POST" on:success={handleSuccess} on:error={handleError} {csrfToken}>
        { #if success }
            <p class="success">Logged in successfully</p>
        { :else if errorText }
            <p class="error">{ errorText }</p>
        {/if }
        <label for="email">Email:</label><br>
        <input type="email" name="email" required><br>
        <label for="password">Пароль:</label><br>
        <input type="password" name="password" required><br>
        
        <Button variant="primary">Войти</Button>
    </AjaxForm>
</section>

<style>
    section.white-block {
        max-width: 450px;
        margin: 0 auto;
    }
    input {
        width: 100%;
    }
</style>
