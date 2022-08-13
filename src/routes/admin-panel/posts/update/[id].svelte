<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(`http://localhost:8080/api/admin/post/${id}`)
        const post = (await res.json()).post

        if (res.ok) {
            return { props: { post } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm } from '$components'
    import { slide } from 'svelte/transition'
    import { range } from '$lib/utilities'
    import type { PostI } from '../../../../types'

    export let post: PostI

    let links = post.links.length
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
        <h3>Редактирование публикации</h3>
        <AjaxForm action="/api/admin/post/{ post.id }" method="PATCH" on:success={ handleSuccess } on:error={ handleError } noReset={ true }>
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
                        <input class="form-control" type="text" name="title" id="title" value={ post.title } />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Текст:</span><br />
                        <textarea class="form-control" name="text" cols="30" rows="4">{ post.text }</textarea>
                    </label>
                </div>
                <div id="vs2f">
                    { #each range(1, links) as i }
                        { @const link = post.links[i - 1] }
                        <div class="input-group">
                            <span class="input-group-text">Ссылка</span>
                            <input type="text" aria-label="Текст ссылки" name="link_text{ i }" placeholder="Текст ссылки" class="form-control" value={ link ? link.text : '' }>
                            <input type="text" aria-label="URL" name="link_url{ i }" placeholder="URL" class="form-control" value={ link ? link.url : '' }>
                        </div>
                        <br />
                    { /each }
                    { #if links < 5 }
                        <button type="button" class="btn btn-outline-primary" on:click={ addLink }>Добавить ссылку</button>
                    { /if }
                    { #if links > 1 }
                        <button type="button" class="btn btn-outline-danger" on:click={ removeLink }>Убрать ссылку</button>
                    { /if }
                </div>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </AjaxForm>
    </div>
    <br />
</section>

<style>
    label {
        width: 100%;
    }

    #vs2f {
        padding-top: 24px;
    }
</style>
