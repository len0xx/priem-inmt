<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch(apiRoute('admin/media?type=media'))
        const files = (await res.json()).documents

        if (res.ok) {
            return { props: { files } }
        }
    }
</script>

<script lang="ts">
    import { Form, Grid, Modal } from '$components'
    import { blur } from 'svelte/transition'
    import type { DocumentI, ModalComponent } from '../../../types'

    export let files: DocumentI[]

    let deleteId = 0
    let modal: ModalComponent = null

    const handleSuccess = (event: CustomEvent) => {
        const doc = event.detail.document
        files = [ ...files, doc ]
    }

    const deleteDocument = async () => {
        const res = await fetch(apiRoute(`admin/media/${deleteId}`), { method: 'DELETE' })
        if (res.ok) {
            files = files.filter(doc => doc.id !== deleteId)
        }
        modal.close()
    }

    const isImage = (extension: string) => ['jpeg', 'jpg', 'png'].includes(extension)
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">
        Вы действительно хотите удалить этот файл?<br />
        Это действие нельзя отменить
    </p>
    <div class="buttons-row">
        <button type="button" on:click={ () => deleteDocument() } class="btn btn-danger">Удалить</button>
        <button type="button" on:click={ modal.close } class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Загрузка файлов</h2>
        <Form action="/api/admin/media?type=media" method="POST" content="multipart/form-data" on:success={ handleSuccess }>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="form-label">Название файла (необязательно)</span>
                    <input type="text" class="form-control wide" placeholder="Название" name="title" />
                </label>
                <label>
                    <span class="form-label">Файл</span><br />
                    <input required class="form-control" type="file" name="media" id="media" accept=".pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .svg, .mp4, .webm, .ogg, .avi, .mov, .mpeg, .mkv"/>
                </label>
            </div>
            <div class="buttons-row">
                <button class="btn btn-primary">Отправить</button>
            </div>
        </Form>
    </div>
    <br />
    { #if files.length }
        <div class="white-block-wide">
            <h3 class="no-top-margin">Загруженные файлы</h3>
            <Grid l={3} m={2} s={1}>
                { #each files as file (file.id) }
                    <span transition:blur|local={{ duration: 200 }}>
                        <div class="card">
                            <div class="row g-0">
                                { #if isImage(file.extension) }
                                    <div class="col-md-4">
                                        <div class="card-img" style:background-image="url({ file.src })"></div>
                                    </div>
                                { /if }
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h4 class="card-title">{ file.title }</h4>
                                        <a href={ file.src } target="_BLANK" class="btn btn-outline-primary btn-sm mb-2">Открыть</a><br />
                                        <button class="btn btn-outline-danger btn-sm" on:click={ () => { deleteId = file.id; modal.open() } }>Удалить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                { /each }
            </Grid>
        </div>
    { /if }
</section>

<style>
    label {
        width: 100%;
    }
</style>
