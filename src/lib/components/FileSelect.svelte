<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { blur, slide } from 'svelte/transition'
    import { Modal, Grid, Form, Pagination } from '.'
    import { apiRoute, isImage } from '$lib/utilities'
    import { isMobile, modalOpened } from '$lib/stores'
    import type { IDocument, ModalComponent } from '../../types'

    export let modal: ModalComponent = null
    export let selected: number = null
    
    const dispatch = createEventDispatcher()
    const LIMIT = 9
    let currentPage = 1
    let filesAmount = 0
    let uploadForm = false
    let selectedFile = selected
    let selectedPath: string = null
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

    const selectFile = (file: IDocument) => {
        selectedFile = file.id
        selectedPath = file.src
    }

    const saveChanges = () => {
        dispatch('save', { id: selectedFile, path: selectedPath })
        modal.close()
    }

    const discard = () => {
        dispatch('discard')
        modal.close()
    }

    const handleSuccess = async () => {
        filesPromise = (getFiles(currentPage) as Promise<IDocument[]>)
    }

    const handleOpen = () => $modalOpened = true

    const handleClose = () => $modalOpened = false
</script>

<Modal bind:this={ modal } on:open={ handleOpen } on:close={ handleClose } className="file-select-modal">
    <Grid m={2} alignItems="center">
        <h3 class="no-top-margin mb-0">Выбор файла</h3>
        {#if $isMobile}
            <div>
                <button type="button" class="btn btn-outline-success" class:btn-outline-success={ !uploadForm } class:btn-outline-secondary={ uploadForm } on:click={ () => uploadForm = !uploadForm }>
                    { uploadForm ? 'Скрыть форму' : 'Новый файл' }
                </button>
            </div>
        {/if}
    </Grid>
    <br />
    { #if $isMobile && uploadForm }
        <div transition:slide={{ duration: 200 }}>
            <Form action="/api/admin/documents?type=media" method="POST" content="multipart/form-data" on:success={ handleSuccess }>
                <Grid m={3} s={1} alignItems="end">
                    <label class="wide">
                        <span class="form-label">Название нового файла</span>
                        <input type="text" class="form-control wide" placeholder="Название" name="title" required />
                    </label>
                    <label>
                        <span class="caption">Файл</span><br />
                        <input required class="form-control" type="file" name="file" id="file" />
                    </label>
                    <div>
                        <button class="btn btn-primary">Загрузить</button>
                    </div>
                </Grid>
            </Form>
        </div>
        <br />
    { /if }
    { #await filesPromise }
        <div class="align-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
        </div>
    {:then files }
        { #if files && files.length }
            <Grid className="file-select-grid" l={3} m={2} s={2}>
                { #each files as file (file.id) }
                    <span transition:blur|local={{ duration: 200 }}>
                        <div class="file-select-card card {selectedFile === file.id ? 'select' : ''}" on:click={ () => selectFile(file) }>
                            {#if $isMobile}
                                <div class="file-select-check form-check form-check-inline me-0">
                                  <input class="form-check-input" bind:group={selectedFile} type="radio" id="inlineRadio" value={file.id} on:click={ () => selectFile(file)}>
                                </div>
                            {/if}
                            <div class="file-select-content row g-0">
                                { #if isImage(file.extension) }
                                    <div class="col-md-4">
                                        <div class="file-select-img card-img" style:background-image="url({ file.src })"></div>
                                    </div>
                                {:else if $isMobile}
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h4 class="card-title">{ file.title }</h4>
                                            <a href={ file.src } target="_BLANK" class="btn btn-outline-primary btn-sm mb-2">Открыть</a><br />
                                        </div>
                                    </div>
                                { /if }
                                {#if !$isMobile}
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h4 class="card-title">{ file.title }</h4>
                                            <a href={ file.src } target="_BLANK" class="btn btn-outline-primary btn-sm mb-2">Открыть</a><br />
                                            <button class="btn btn-sm mb-2 { selectedFile === file.id ? 'btn-primary' : 'btn-outline-primary' }" on:click={ () => selectFile(file) }>
                                                { selectedFile === file.id ? 'Файл выбран' : 'Выбрать' }
                                            </button><br />
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </span>
                { /each }
            </Grid>
        { :else }
            <p>Файлы не найдены</p>
        { /if }
    {/await }
    <br />
    <Pagination { pagesAmount } bind:currentPage />
    { #if !$isMobile && uploadForm }
        <div transition:slide={{ duration: 200 }}>
            <Form action="/api/admin/documents?type=media" method="POST" content="multipart/form-data" on:success={ handleSuccess }>
                <Grid m={3} s={1} alignItems="end">
                    <label class="wide">
                        <span class="form-label">Название нового файла</span>
                        <input type="text" class="form-control wide" placeholder="Название" name="title" required />
                    </label>
                    <label>
                        <span class="caption">Файл</span><br />
                        <input required class="form-control" type="file" name="file" id="file" />
                    </label>
                    <div>
                        <button class="btn btn-primary">Загрузить</button>
                    </div>
                </Grid>
            </Form>
        </div>
    { /if }
    <div class="buttons-row">
        <button type="button" class="btn btn-primary" on:click={ saveChanges }>Сохранить</button>
        { #if !$isMobile }
            <button type="button" class="btn btn-outline-success" class:btn-outline-success={ !uploadForm } class:btn-outline-secondary={ uploadForm } on:click={ () => uploadForm = !uploadForm }>
                { uploadForm ? 'Скрыть форму загрузки' : 'Загрузить новый файл' }
            </button>
        { /if }
        <button type="button" class="btn btn-outline-secondary" on:click={ discard }>Отмена</button>
    </div>
</Modal>

<style>
    .file-select-card {
        position: relative;
        height: 145px;
    }

    .file-select-check {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1;
    }

    .file-select-card.select {
        border: 2px solid #0d6efd;
    }

    .file-select-content {
        height: 100%;
    }
</style>