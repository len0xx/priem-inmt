<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import { blur } from 'svelte/transition'
    import { Modal, Grid } from '.'
    import type { DocumentI, ModalComponent } from '../../types'

    export let modal: ModalComponent = null
    export let selected: number = null
    
    const dispatch = createEventDispatcher()
    const LIMIT = 9
    let selectedFile: number = selected
    let selectedPath: string
    let currentPage = 1
    let filesAmount = 0
    let pagesAmount = 1
    $: filesPromise = (getFiles(currentPage) as Promise<DocumentI[]>)

    const getFiles = async (page: number): Promise<DocumentI[]> => {
        const res = await fetch(`http://localhost:8080/api/admin/media?type=media&page=${page}`)
        const files = (await res.json()).documents

        if (res.ok) {
            return files
        }
    
        throw new Error('Could not fetch files')
    }

    const getFilesAmount = async (): Promise<number> => {
        const res = await fetch('http://localhost:8080/api/admin/media/count')
        const amount = (await res.json()).amount

        if (res.ok) {
            return amount
        }
    
        throw new Error('Could not fetch amount')
    }

    const selectFile = (file: DocumentI) => {
        selectedFile = file.id
        selectedPath = file.src
    }

    const isImage = (extension: string) => ['jpeg', 'jpg', 'png'].includes(extension)

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

    onMount(async () => {
        filesAmount = await getFilesAmount()
        pagesAmount = Math.ceil(filesAmount / LIMIT)
    })
</script>

<Modal bind:this={ modal } className="file-select-modal">
    <h3 class="no-top-margin">Выбор файла</h3>
    { #await filesPromise }
        <div class="align-center">
            <div class="spinner-border" role="status">
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
                                        <img src={ file.src } class="card-img-top" alt={ file.title }>
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
            Файлы не найдены
        { /if }
    {/await }
    <br />
    { #if pagesAmount > 1 }
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item">
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
                <li class="page-item">
                    <span class="page-link" aria-label="Следующая страница" on:click={ nextPage }>
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav>
    { /if }
    <div class="buttons-row">
        <button type="button" class="btn btn-primary" on:click={ saveChanges }>Сохранить</button>
        <button type="button" class="btn btn-outline-secondary" on:click={ discard }>Отмена</button>
    </div>
</Modal>