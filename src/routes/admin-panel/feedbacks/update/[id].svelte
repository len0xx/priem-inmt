<!-- <script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/feedback')
        const feedbacks = (await res.json()).feedbacks

        if (res.ok) {
            return { props: { feedbacks } }
        }
    }
</script> -->

<script lang="ts">
    import { AjaxForm } from '$components'
    import { slide } from 'svelte/transition'
    // import { range } from '$lib/utilities'
    import { Grid } from '$components'
    // import type { FeedbackI } from '../../../types'

    // export let feedbacks: FeedbackI[]

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
        <AjaxForm action="/api/admin/feedback" method="POST" on:success={ handleSuccess } on:error={ handleError }>
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
                        <input class="form-control" type="text" name="title" id="title" required />
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
                        <input class="form-control" type="file" name="img" id="img" />
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
            <button class="btn btn-primary">Сохранить</button>
        </AjaxForm>
    </div>
    <!-- <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Существующие публикации</h3>
        <Grid l={3} m={2} s={1}>
            { #each posts as post, i (i) }
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{ post.title }</h4>
                        <p class="card-text">{ post.text }</p>
                        <a href="/admin-panel/posts/update/{ post.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                        <button class="btn btn-outline-danger btn-sm">Удалить</button>
                    </div>
                </div>
            { /each }
        </Grid>
    </div> -->
</section>

<style>
    label {
        width: 100%;
    }
</style>
