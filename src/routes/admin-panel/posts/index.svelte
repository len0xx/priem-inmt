<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/post')
        const posts = (await res.json()).posts

        if (res.ok) {
            return { props: { posts } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm } from '$components'
    import { slide, blur } from 'svelte/transition'
    import { range } from '$lib/utilities'
    import { Grid } from '$components'
    import type { PostI } from '../../../types'

    export let posts: PostI[]

    let links = 1
    let success = false
    let errorText = ''
    let successText = ''

    const addLink = () => links++

    const removeLink = () => links--

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
        <h2 class="no-top-margin">Публикации на главной странице</h2>
        <h3>Создать новую публикацию</h3>
        <AjaxForm action="/api/admin/post" method="POST" on:success={ handleSuccess } on:error={ handleError }>
            { #if success }
                <p transition:slide={{ duration: 200 }} class="success">{ successText }</p>
            { /if }
            { #if errorText }
                <p transition:slide={{ duration: 200 }} class="error">{ errorText }</p>
            { /if }
            <div class="grid grid-2 m-grid-1">
                <div>
                    <label>
                        <span class="caption">Заголовок:</span><br />
                        <input class="form-control" type="text" name="title" id="title" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Текст:</span><br />
                        <textarea class="form-control" name="text" cols="30" rows="4"></textarea>
                    </label>
                </div>
                <div id="vs2f">
                    { #each range(1, links) as i }
                        <div class="input-group" transition:slide|local={{ duration: 200 }}>
                            <span class="input-group-text">Ссылка</span>
                            <input type="text" aria-label="Текст ссылки" name="link_text{ i }" placeholder="Текст ссылки" class="form-control">
                            <input type="text" aria-label="URL" name="link_url{ i }" placeholder="URL" class="form-control">
                        </div>
                        <br />
                    { /each }
                    { #if links < 5 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-primary" on:click={ addLink }>Добавить ссылку</button>
                    { /if }
                    { #if links > 1 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-danger" on:click={ removeLink }>Убрать ссылку</button>
                    { /if }
                </div>
            </div>
            <br />
            <button class="btn btn-primary">Создать</button>
        </AjaxForm>
    </div>
    <br />
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
    </div>
</section>

<style>
    label {
        width: 100%;
    }

    #vs2f {
        padding-top: 24px;
    }
</style>
