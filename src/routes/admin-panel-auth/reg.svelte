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

<div class="white-block authorization-block">
    <h2>Создание аккаунта</h2>
    <AjaxForm action="/api/auth/signup" method="POST" on:success={handleSuccess} on:error={handleError} {csrfToken}>
        { #if success }
            <p class="success">Аккаунт успешно создан</p>
        { :else if errorText }
            <p class="error">{ errorText }</p>
        {/if }
        <label for="firstname">Имя:</label><br>
        <input class="form-control" type="text" name="firstname" required><br>
        <label for="lastname">Фамилия:</label><br>
        <input class="form-control" type="text" name="lastname"><br>
        <label for="text">Email:</label><br>
        <input class="form-control" type="email" name="email" required><br>
        <label for="password">Пароль:</label><br>
        <input class="form-control" type="password" name="password" required><br>
        <br />
        <div class="align-center">
            <Button variant="primary">Создать</Button>
        </div>
    </AjaxForm>
</div>
