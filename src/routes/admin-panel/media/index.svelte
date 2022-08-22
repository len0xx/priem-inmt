<!-- <script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/post')
        const posts = (await res.json()).posts

        if (res.ok) {
            return { props: { posts } }
        }
    }
</script> -->

<script lang="ts">
    import { Form } from '$components'
    // import { slide, blur } from 'svelte/transition'
    // import { range, redirect } from '$lib/utilities'
    // import type { PostI } from '../../../types'

    // export let posts: PostI[]

    const handleSuccess = (event: CustomEvent) => {
        console.log(event.detail)
    }

</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<!-- <Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление публикации</p>
    <div class="buttons-row">
        <button type="button" on:click={ () => deletePost(deleteId) } class="btn btn-danger">Удалить</button>
        <button type="button" on:click={ modal.close } class="btn btn-secondary">Отмена</button>
    </div>
</Modal> -->

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Загрузка файлов</h2>
        <!-- <h3>Создать новую публикацию</h3> -->
        <Form action="/api/admin/media" method="POST" content="multipart/form-data" on:success={ handleSuccess }>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="form-label">Название файла (необязательно)</span>
                    <input type="text" class="form-control wide" placeholder="Название" name="title" />
                </label>
                <label>
                    <span class="form-label">Файл</span><br />
                    <input required class="form-control" type="file" name="media" id="media" />
                </label>
                <div class="buttons-row">
                    <button class="btn btn-primary">Отправить</button>
                </div>
            </div>
        </Form>
    </div>
    <br />
    <!-- <div class="white-block-wide">
        <h3 class="no-top-margin">Загруженные файлы</h3>
        <Grid l={3} m={2} s={1}>
            { #each posts as post, i (i) }
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{ post.title }</h4>
                        <p class="card-text">{ post.text }</p>
                        <a href="/admin-panel/posts/update/{ post.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                        <button class="btn btn-outline-danger btn-sm" on:click={ () => { deleteId = post.id; modal.open() } }>Удалить</button>
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
