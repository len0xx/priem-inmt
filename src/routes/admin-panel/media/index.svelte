<script lang="ts">
    import { Form, Grid, Modal, Pagination } from '$components'
    import { blur } from 'svelte/transition'
    import { onMount } from 'svelte'
    import { apiRoute, isImage } from '$lib/utilities'
    import type { IDocument, ModalComponent } from '../../../types'

    let deleteId = 0
    let modal: ModalComponent = null
    let documentLoading = false

    const LIMIT = 9
    let currentPage = 1
    let filesAmount = 0

    $: pagesAmount = Math.ceil(filesAmount / LIMIT) || 1
    $: filesPromise = (getFiles(currentPage) as Promise<IDocument[]>)

    const getFiles = async (page: number): Promise<IDocument[]> => {
        const res = await fetch(apiRoute(`admin/media?type=media&page=${page}`))
        const json = await res.json()
        const files = json.documents
        filesAmount = json.amount

        if (res.ok)
            return files
    
        throw new Error('Не удалось загрузить файлы')
    }

    const handleSuccess = () => filesPromise = getFiles(currentPage)

    const handlePageChange = (e: CustomEvent<number>) => {
        const params = new URLSearchParams(window.location.search)
        params.set('page', e.detail.toString())

        const url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + params.toString()
        window.history.pushState({ path: url }, '', url)
    }

    const deleteDocument = async () => {
        const res = await fetch(apiRoute(`admin/media/${deleteId}`), { method: 'DELETE' })
        if (res.ok) {
            filesPromise = getFiles(currentPage)
        }
        modal.close()
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search)
        currentPage = (+params.get('page') || 1)
    })
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
        <Form action="/api/admin/media?type=media" method="POST" content="multipart/form-data" on:success={ handleSuccess } on:submit={ () => documentLoading = true } on:done={ () => documentLoading = false }>
            <Grid m={2} s={1} placeContent="start">
                <label>
                    <span class="form-label">Название файла (необязательно)</span>
                    <input type="text" class="form-control wide" placeholder="Название" name="title" />
                </label>
                <label>
                    <span class="form-label">Файл</span><br />
                    <input required class="form-control" type="file" name="media" id="media" accept=".pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .svg, .mp4, .webm, .ogg, .avi, .mov, .mpeg, .mkv"/>
                </label>
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary" disabled={ documentLoading }>
                    { #if documentLoading }
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Загрузка...</span>
                    { :else }
                        <span>Отправить</span>
                    { /if }
                </button>
            </div>
        </Form>
        <br />
        { #await filesPromise }
            <div class="align-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
            </div>
        { :then files }
            { #if files && files.length }
                <h3 class="no-top-margin">Загруженные файлы</h3>
                <Grid l={3} m={2} s={1} placeContent="start">
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
                                            <a href={ file.src } target="_BLANK" class="btn btn-outline-primary btn-sm mb-2">
                                                Открыть
                                            </a><br />
                                            <button class="btn btn-outline-danger btn-sm" on:click={ () => { deleteId = file.id; modal.open() } }>
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    { /each }
                </Grid>
            { :else }
                <p>Файлы не найдены</p>
            { /if }
        { /await }
        <br />
        <Pagination { pagesAmount } bind:currentPage on:pageChange={ handlePageChange } />
    </div>
    <br />
</section>

<style>
    label {
        width: 100%;
    }
</style>
