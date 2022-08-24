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
    import { Form, Modal, Grid, FileSelect } from '$components'
    import { slide, blur } from 'svelte/transition'
    import { range, redirect } from '$lib/utilities'
    import type { PostI, ModalComponent } from '../../../types'

    export let posts: PostI[]

    let fileModal: ModalComponent = null
    let fileId: number = null
    let filePath: string = null

    let links = 1
    let deleteId = 0
    let modal: ModalComponent = null

    const addLink = () => links++

    const removeLink = () => links--

    const handleSuccess = () => {
        redirect('/admin-panel/posts')
    }

    const deletePost = async (id: number) => {
        const res = await fetch(`http://localhost:8080/api/admin/post/${id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/posts')
        }
        modal.close()
    }

    const fileSelected = (event: CustomEvent<{id: number, path: string}>) => {
        fileId = event.detail.id
        filePath = event.detail.path
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление публикации</p>
    <div class="buttons-row">
        <button type="button" on:click={ () => deletePost(deleteId) } class="btn btn-danger">Удалить</button>
        <button type="button" on:click={ modal.close } class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Публикации на главной странице</h2>
        <h3>Создать новую публикацию</h3>
        <Form action="/api/admin/post" method="POST" on:success={ handleSuccess }>
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
                    <br />
                    <label>
                        <span class="caption">Изображение { fileId ? `(${ fileId })` : '' }:</span>
                        {#if filePath}
                            <br />
                            <img width="150px" height="150px" src={filePath} class="img-fluid mt-3 mb-3" alt="Изображение">   
                        {/if}                 
                        <input type="hidden" name="img" value={ fileId }><br />
                        <button type="button" class="btn btn-outline-primary" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать файл' } </button>
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
        </Form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Существующие публикации</h3>
        <Grid l={3} m={2} s={1}>
            { #each posts as post, i (i) }
                <div class="card">
                    <div class="card-body">
                        {#if post.img}
                            <img src={post.img} class="img-fluid mb-3" alt="Изображение">                                              
                        {/if}
                        <h4 class="card-title">{ post.title }</h4>
                        <p class="card-text">{ post.text }</p>
                        <a href="/admin-panel/posts/update/{ post.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                        <button class="btn btn-outline-danger btn-sm" on:click={ () => { deleteId = post.id; modal.open() } }>Удалить</button>
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
