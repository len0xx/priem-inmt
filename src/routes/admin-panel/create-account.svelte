<script context="module" lang="ts">
    export async function load({ session }) {
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
        redirect('/profile')
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>Создание нового аккаунта</title>
</svelte:head>

<section class="white-block">
    <h1>Создание аккаунта</h1>
    <AjaxForm action="/api/admin/signup" method="POST" on:success={handleSuccess} on:error={handleError} {csrfToken}>
        { #if success }
            <p class="success">Account created</p>
        { :else if errorText }
            <p class="error">{ errorText }</p>
        {/if }
        <label for="firstname">Имя:</label><br>
        <input type="text" name="firstname" required><br>
        <label for="lastname">Фамилия:</label><br>
        <input type="text" name="lastname"><br>
        <label for="text">Email:</label><br>
        <input type="email" name="email" required><br>
        <label for="password">Пароль:</label><br>
        <input type="password" name="password" required><br>
        
        <Button variant="primary">Создать</Button>
    </AjaxForm>
</section>

<style>
    section.white-block {
        max-width: 450px;
        margin: 0 auto;
    }
    
    input {
        width: 100%
    }
</style>
