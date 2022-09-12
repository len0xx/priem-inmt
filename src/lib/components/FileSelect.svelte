<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { blur, slide } from 'svelte/transition'
    import { Modal, Grid, Form } from '.'
    import { apiRoute } from '$lib/utilities'
    import type { DocumentI, ModalComponent } from '../../types'

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
    $: filesPromise = (getFiles(currentPage) as Promise<DocumentI[]>)

    const getFiles = async (page: number): Promise<DocumentI[]> => {
        const res = await fetch(apiRoute(`admin/media?type=media&page=${page}`))
        const json = await res.json()
        const files = json.documents
        filesAmount = json.amount

        if (res.ok)
            return files
    
        throw new Error('Не удалось загрузить файлы')
    }

    const selectFile = (file: DocumentI) => {
        selectedFile = file.id
        selectedPath = file.src
    }

    const isImage = (extension: string) => ['jpeg', 'jpg', 'png', 'svg'].includes(extension)

    const saveChanges = () => {
        dispatch('save', { id: selectedFile, path: selectedPath })
        modal.close()
    }

    const discard = () => {
        dispatch('discard')
        modal.close()
    }

    const prevPage = () => {
        if (currentPage > 1) {
            currentPage--
        }
    }

    const selectPage = (num: number) => {
        if (num >= 1 && num <= pagesAmount) currentPage = num
    }

    const nextPage = () => {
        if (currentPage < pagesAmount) {
            currentPage++
        }
    }

    const handleSuccess = async () => {
        filesPromise = (getFiles(currentPage) as Promise<DocumentI[]>)
    }
</script>

<Modal bind:this={ modal } className="file-select-modal">
    <h3 class="no-top-margin">Выбор файла</h3>
    { #await filesPromise }
        <div class="align-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
        </div>
    {:then files }
        { #if files && files.length }
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
                                        <button class="btn btn-sm mb-2 { selectedFile === file.id ? 'btn-primary' : 'btn-outline-primary' }" on:click={ () => selectFile(file) }>
                                            { selectedFile === file.id ? 'Файл выбран' : 'Выбрать' }
                                        </button><br />
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
    {/await }
    <br />
    { #if pagesAmount > 1 }
        <nav aria-label="Page navigation" class="align-center">
            <ul class="pagination">
                <li class="page-item" class:disabled={ currentPage === 1 }>
                    <span class="page-link" aria-label="Предыдущая страница" on:click={ prevPage }>
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
                <!-- Consider as bad practice, needs refactoring ASAP -->
                { #each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as i (i) }
                    { #if pagesAmount >= i }
                        <li class="page-item" on:click={ () => selectPage(i) }><span class="page-link">{ i }</span></li>
                    { /if }
                { /each }
                <li class="page-item" class:disabled={ currentPage === pagesAmount }>
                    <span class="page-link" aria-label="Следующая страница" on:click={ nextPage }>
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav>
    { /if }
    { #if uploadForm }
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
        <button type="button" class="btn btn-outline-success" class:btn-outline-success={ !uploadForm } class:btn-outline-secondary={ uploadForm } on:click={ () => uploadForm = !uploadForm }>
            { uploadForm ? 'Скрыть форму загрузки' : 'Загрузить новый файл' }
        </button>
        <button type="button" class="btn btn-outline-secondary" on:click={ discard }>Отмена</button>
    </div>
</Modal>