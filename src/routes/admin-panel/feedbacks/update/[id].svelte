<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(`http://localhost:8080/api/admin/feedback/${id}`)
        const feedback = (await res.json()).feedback

        if (res.ok) {
            return { props: { feedback } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm } from '$components'
    import { slide } from 'svelte/transition'
    import { Grid } from '$components'
    import type { FeedbackI } from '../../../../types'

    export let feedback: FeedbackI

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
        <h3>Редактировать отзыв</h3>
        <AjaxForm action="/api/admin/feedback/{ feedback.id }" method="PATCH" on:success={ handleSuccess } on:error={ handleError } noReset={ true }>
            { #if success }
                <p transition:slide={{ duration: 200 }} class="success">{ successText }</p>
            { /if }
            { #if errorText }
                <p transition:slide={{ duration: 200 }} class="error">{ errorText }</p>
            { /if }
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Автор:</span><br />
                        <input class="form-control" type="text" name="name" id="name" value={ feedback.name } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" value={ feedback.description } />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <input class="form-control" type="text" name="img" id="img" value={ feedback.img } /> <!-- TODO: file upload -->
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Текст отзыва:</span><br />
                        <textarea class="form-control" name="text" id="text" rows="8" value={ feedback.text } required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </AjaxForm>
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>
