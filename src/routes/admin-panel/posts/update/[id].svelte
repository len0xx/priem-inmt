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
    import { Form, FileSelect } from '$components'
    import { slide, blur } from 'svelte/transition'
    import { range, redirect } from '$lib/utilities'
    import type { PostI } from '../../../../types'

    export let post: PostI

    let fileModal: { open: () => void, close: () => void } = null
    let fileId: number = null
    let filePath: string = null

    let links = post.links.length

    const addLink = () => links++

    const removeLink = () => links--

    const handleSuccess = () => {
        redirect('/admin-panel/posts')
    }

    const fileSelected = (event: CustomEvent<{ id: number, path: string }>) => {
        fileId = event.detail.id
        filePath = event.detail.path
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Публикации на главной странице</h2>
        <h3>Редактирование публикации</h3>
        <Form action="/api/admin/post/{ post.id }" method="PATCH" on:success={ handleSuccess } reset={ false }>
            <div class="grid grid-2 m-grid-1">
                <div>
                    <label>
                        <span class="caption form-label">Заголовок:</span><br />
                        <input class="form-control" type="text" name="title" id="title" value={ post.title } />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption form-label">Текст:</span><br />
                        <textarea class="form-control" name="text" cols="30" rows="4">{ post.text }</textarea>
                    </label>
                    <br />
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <img width="150px" height="150px" src={filePath ? filePath : post.img} class="img-fluid mt-3 mb-3" alt="Изображение">                   
                        <input type="hidden" name="img" value={ fileId }><br />
                        <button type="button" class="btn btn-outline-primary" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    </label>
                </div>
                <div id="vs2f">
                    { #each range(1, links) as i }
                        { @const link = post.links[i - 1] }
                        <div class="input-group" transition:slide|local={{ duration: 200 }}>
                            <span class="input-group-text">Ссылка</span>
                            <input type="text" aria-label="Текст ссылки" name="link_text{ i }" placeholder="Текст ссылки" class="form-control" value={ link ? link.text : '' }>
                            <input type="text" aria-label="URL" name="link_url{ i }" placeholder="URL" class="form-control" value={ link ? link.url : '' }>
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
            <button class="btn btn-primary">Сохранить</button>
        </Form>
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
