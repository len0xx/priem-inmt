<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/feedback')
        const feedbacks = (await res.json()).feedbacks

        if (res.ok) {
            return { props: { feedbacks } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm, Profile } from '$components'
    import { slide } from 'svelte/transition'
    import { Grid } from '$components'
    import type { FeedbackI } from '../../../types'

    export let feedbacks: FeedbackI[]

    let success = false
    let errorText = ''
    let successText = ''

    const handleSuccess = (event: CustomEvent<{ message: string }>) => {
        success = true
        successText = event.detail.message
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        success = false
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Отзывы</h2>
        <h3>Создать новый отзыв</h3>
        <AjaxForm action="/api/admin/feedback" method="POST" on:success={ handleSuccess } on:error={ handleError }>
            { #if success }
                <p transition:slide={{ duration: 200 }} class="success">{ successText }</p>
            { /if }
            { #if errorText }
                <p transition:slide={{ duration: 200 }} class="error">{ errorText }</p>
            { /if }
            <Grid m={2} s={1} alignItems="stretch">
                <div>
                    <label>
                        <span class="caption">Автор:</span><br />
                        <input class="form-control" type="text" name="name" id="name" required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <input class="form-control" type="text" name="img" id="img" /> <!-- TODO: file upload -->
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Текст отзыва:</span><br />
                        <textarea class="form-control" name="text" id="text" rows="8" required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </AjaxForm>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Существующие отзывы</h3>
        <Grid m={3} s={1} alignItems="start">
            <Grid m={1} alignItems="start">
                { #each feedbacks.filter((_, i) => i % 3 == 0) as feedback }
                    <Profile img={ feedback.img }>
                        <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                        <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                        <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                    </Profile>
                    <div>
                        <a href="/admin-panel/feedbacks/update/{ feedback.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                        <AjaxForm className="d-inline" action="/api/admin/feedback/{ feedback.id }" method="DELETE" on:success={ handleSuccess } on:error={ handleError }>
                            <button class="btn btn-outline-danger btn-sm">Удалить</button>
                        </AjaxForm>
                    </div>
                { /each }
            </Grid>
            <Grid m={1} alignItems="start">
                { #each feedbacks.filter((_, i) => i % 3 == 1) as feedback }
                    <Profile img={ feedback.img }>
                        <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                        <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                        <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                    </Profile>
                    <div>
                        <a href="/admin-panel/feedbacks/update/{ feedback.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                        <AjaxForm className="d-inline" action="/api/admin/feedback/{ feedback.id }" method="DELETE" on:success={ handleSuccess } on:error={ handleError }>
                            <button class="btn btn-outline-danger btn-sm">Удалить</button>
                        </AjaxForm>
                    </div>
                { /each }
            </Grid>
            <Grid m={1} alignItems="start">
                { #each feedbacks.filter((_, i) => i % 3 == 2) as feedback }
                    <Profile img={ feedback.img }>
                        <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                        <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                        <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                    </Profile>
                    <div>
                        <a href="/admin-panel/feedbacks/update/{ feedback.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                        <AjaxForm className="d-inline" action="/api/admin/feedback/{ feedback.id }" method="DELETE" on:success={ handleSuccess } on:error={ handleError }>
                            <button class="btn btn-outline-danger btn-sm">Удалить</button>
                        </AjaxForm>
                    </div>
                { /each }
            </Grid>
        </Grid>
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>