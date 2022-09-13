<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const documentsRes = await fetch(apiRoute('admin/documents?type=docAccommodation'))
        const rentInfoRes = await fetch(apiRoute('admin/rentInfo'))
        const settlementRes = await fetch(apiRoute('admin/settlement'))
        const dormsRes = await fetch(apiRoute('admin/dormitory'))
        const infoRes = await fetch(apiRoute('admin/textinfo/?page=accommodation'))

    
        const documents = (await documentsRes.json()).documents
        const rentInfo = (await rentInfoRes.json()).rentInfo
        const settlement = (await settlementRes.json()).responsible
        const dormitories = (await dormsRes.json()).dormitories
        const info = (await infoRes.json()).info

        if (documentsRes.ok && rentInfoRes.ok && settlementRes.ok && infoRes.ok) {
            return { props: { documents, rentInfo, settlement, dormitories, pageInfo: info } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Graduate, Form, Modal, Document, FileSelect, RoundButton } from '$components'
    import { imask } from 'svelte-imask'
    import { slide, blur } from 'svelte/transition'
    import { isMobile } from '$lib/stores.js'
    import type { DocumentI, DormitoryI, RentInfoI, SettlementI, ModalComponent } from '../../../types'

    export let dormitories: DormitoryI[] = []
    export let documents: DocumentI[] = []
    export let rentInfo: RentInfoI = null
    export let settlement: SettlementI = null
    export let pageInfo: Record<string, string> = {}

    const totalMobileObjects = 4

    let modalDormitory: ModalComponent = null
    let dormitoryId: number

    let fileModal: ModalComponent = null
    let fileId: number = null
    let filePath: string = null

    let responsibleImageModal: ModalComponent = null
    let responsibleImageId: number = null
    let responsibleImagePath: string = null

    let documentLoading = false
    let dormitoriesExpanded = false

    const updateDormitoryId = (id: number) => {
        dormitoryId = id
        modalDormitory.open()
    }

    const fileSelected = (event: CustomEvent<{id: number, path: string}>) => {
        fileId = event.detail.id
        filePath = event.detail.path
    }

    const resetFiles = () => {
        fileId = null
        filePath = null
    }

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    let deleteId = 0
    let modal: ModalComponent = null

    const responsibleImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        responsibleImageId = event.detail.id
        responsibleImagePath = event.detail.path
    }

    const deleteDocument = async () => {
        const res = await fetch(apiRoute(`admin/documents/${deleteId}`), { method: 'DELETE' })
        if (res.ok) {
            documents = documents.filter(doc => doc.id !== deleteId)
        }
        modal.close()
    }

    const deleteDormitory = async () => {
        const res = await fetch(apiRoute(`admin/dormitory/${dormitoryId}`), { method: 'DELETE' })
        if (res.ok) {
            dormitories = dormitories.filter(dormitory => dormitory.id !== dormitoryId)
        }
        modalDormitory.close()
    }

    const showNewDocument = (event: CustomEvent<{ message: string, document: DocumentI }>) => {
        const doc = event.detail.document
        documents = [ ...documents, doc ]
    }

    const showNewDormitory = (event: CustomEvent<{ message: string, dormitory: DormitoryI }>) => {
        const dorm = event.detail.dormitory
        dormitories = [ ...dormitories, dorm ]
        resetFiles()
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

<FileSelect bind:modal={ responsibleImageModal } on:save={ responsibleImageSelected } />

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот документ?</p>
    <div class="buttons-row">
        <button type="button" on:click={ deleteDocument } class="btn btn-danger">Удалить</button>
        <button type="button" on:click={ modal.close } class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalDormitory } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это общежитие?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteDormitory} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalDormitory.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование страницы поселения</h2>
        <h3>Информация в промо-блоке</h3>
        <Form action="/api/admin/textinfo?page=accommodation" method="PATCH" reset={ false }>
            <Grid m={2} s={1} placeContent="start">
                <label>
                    <span class="caption">Заголовок:</span><br />
                    <input required class="form-control" type="text" name="accommodationTitle" value={ pageInfo.accommodationTitle || '' }>
                </label>
                <label>
                    <span class="caption">Подзаголовок:</span><br />
                    <input required class="form-control" type="text" name="accommodationSubtitle" value={ pageInfo.accommodationSubtitle || '' }>
                </label>
            </Grid>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>
    </div>
    <br />    
    <div class="white-block-wide">
        <h3>Общежития</h3>
        <Form action="/api/admin/dormitory" method="POST" reset={ true } on:success={ showNewDormitory }>
            <Grid m={2} s={1} placeContent="start">
                <label>
                    <span class="caption">Название:</span><br />
                    <input class="form-control" type="text" name="title" id="title" required />
                </label>
                <label>
                    <span class="caption">Адрес:</span><br />
                    <input class="form-control" type="text" name="address" id="address" />
                </label>
                <label>
                    <span class="caption">Изображение:</span>
                    <br />
                    {#if filePath}
                        <img width="150px" height="150px" src={filePath} class="img-fluid mt-3 mb-3" alt="Изображение общежития">
                        <br />
                    {/if}
                    <input type="hidden" name="img" value={ fileId }>
                    {#if $isMobile}
                        <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                    {:else}
                        <button type="button" class="btn btn-outline-success" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    {/if}
                </label>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные общежития</h3>
        {#if dormitories.length}
            <Grid xl={4} l={3} m={2} s={1} placeContent="start">
                {#each dormitories.filter((_, i) => i < ($isMobile ? totalMobileObjects : 8) || dormitoriesExpanded) as dormitory, i (i)}
                    <div transition:blur|local={{ duration: 200 }}>
                        <Graduate name={ dormitory.title } src={ dormitory.img } caption={ dormitory.address }>
                            <a href="/admin-panel/accommodation/dormitories/update/{ dormitory.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateDormitoryId(dormitory.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </Graduate>
                    </div>
                {/each}
            </Grid>
            {#if !dormitoriesExpanded && dormitories.length > ($isMobile ? totalMobileObjects : 8)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => dormitoriesExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет общежитий</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Ответственный за поселение</h3>
        <Form 
            action={settlement ? `/api/admin/settlement/${settlement.id}` : '/api/admin/settlement'} 
            method={settlement ? 'PATCH' : 'POST'} 
            reset={false}
        >
            <Grid m={2} s={1} placeContent="start">
                <div>
                    <label for="name">ФИО</label>
                    <input type="text" class="form-control wide" name="name" value={settlement?.name || ''} required />
                </div>
                <div>
                    <label for="label">Подпись</label>
                    <input type="text" class="form-control wide" name="label" value={settlement?.label || ''} required />
                </div>
            </Grid>
            <br />
            <Grid m={2} s={1} placeContent="start">
                <div>
                    <label for="address">Адрес</label>
                    <input required class="form-control" type="text" value={settlement?.address || ''} name="address" />
                </div>
                <div>
                    <label for="auditory">Аудитория</label>
                    <input required class="form-control" type="text" value={settlement?.auditory || ''} name="auditory" />
                </div>
            </Grid>
            <br />
            <Grid m={2} s={1} placeContent="start">
                <div>
                    <label for="phone">Номер телефона</label>
                    <input required class="form-control" type="text" value={settlement?.phone || ''} use:imask={ phoneMask } name="phone" />
                </div>
                <div>
                    <label for="email">Адрес электронной почты</label>
                    <input required class="form-control" type="email" value={settlement?.email || ''} name="email" />
                </div>
            </Grid>
            <br />
            <label>
                <span class="caption">Фотография:</span><br />
                {#if responsibleImagePath}
                    <img width="150px" height="150px" src={responsibleImagePath} class="img-fluid mt-3 mb-2" alt="Фотография ответственного за поселение"><br />
                {:else if settlement?.photo}
                    <img width="150px" height="150px" src={settlement.photo} class="img-fluid mt-3 mb-2" alt="Фотография ответственного за поселение"><br />
                {/if}
                <input type="hidden" name="photo" value={ responsibleImageId }>
                {#if $isMobile}
                    <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                {:else}
                    <button type="button" class="btn btn-outline-success" on:click={ responsibleImageModal.open }> { responsibleImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                {/if}
            </label>
            <div class="buttons-row">
                {#if settlement}
                    <button class="btn btn-primary">Сохранить</button>
                {:else}
                    <button class="btn btn-primary">Создать</button>
                {/if}
            </div>
        </Form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Альтернативное поселение</h3>
        <Form action="/api/admin/rentInfo" method="POST" reset={ false }>
            <Grid m={2} s={1} placeContent="start">
                <Grid m={1} placeContent="start">
                    <label>
                        <span class="caption">Заголовок:</span><br />
                        <input class="form-control" type="text" name="heading" id="heading" value={ rentInfo?.heading || '' } required />
                    </label>
                    <label>
                        <span class="caption">Подзаголовок:</span><br />
                        <input class="form-control" type="text" name="subheading" id="subheading" value={ rentInfo?.subheading || '' } required />
                    </label>
                    <label>
                        <span class="caption">Текст:</span><br />
                        <textarea class="form-control" name="text" id="text" cols="30" rows="4" value={ rentInfo?.text || '' } required ></textarea>
                    </label>
                </Grid>
                <Grid m={1} placeContent="start">
                    <label>
                        <span class="caption">Телефон 1:</span><br />
                        <input class="form-control" type="text" name="tel1" id="tel1" use:imask={ phoneMask } value={ rentInfo?.tel1 || '' } required />
                    </label>
                    <label>
                        <span class="caption">Телефон 2:</span><br />
                        <input class="form-control" type="text" name="tel2" id="tel2" use:imask={ phoneMask } value={ rentInfo?.tel2 || '' } />
                    </label>
                    <div class="input-group">
                        <span class="input-group-text">Ссылка</span>
                        <input class="form-control" type="text" name="linkText" id="linkText" placeholder="Текст ссылки" aria-label="Текст ссылки" value={ rentInfo?.linkText || '' } />
                        <input class="form-control" type="url" name="linkURL" id="linkURL" placeholder="Адрес ссылки" aria-label="Адрес ссылки" value={ rentInfo?.linkURL || '' } />
                    </div>
                </Grid>
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
            </div>
        </Form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Загрузка документов</h3>
        <Form action="/api/admin/documents?type=docAccommodation" method="POST" content="multipart/form-data" on:success={ showNewDocument } on:submit={ () => documentLoading = true } on:done={ () => documentLoading = false }>
            <label class="wide">
                <span class="form-label">Название документа</span>
                <input type="text" class="form-control wide" placeholder="Название" name="title" required />
            </label>
            <br />
            <br />
            <Grid m={3} s={1} placeContent="start">
                <label>
                    <span class="caption">Документ</span><br />
                    <input required class="form-control" type="file" name="file" id="file" accept=".pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .svg"/>
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
        { #if documents.length }
            <h3>Загруженные документы</h3>
            { #each documents as document, i (i) }
                { @const parts = document.src.split('.') }
                { @const extensionLength = parts.length }
                { @const extension = extensionLength > 1 ? parts[parts.length - 1] : '' }

                <div class="document-row" transition:slide|local={{ duration: 200 }}>
                    <Document filename={ document.title } { extension } link={ document.src } />
                    <button type="button" on:click={() => { deleteId = document.id; modal.open() } } class="btn btn-outline-danger btn-sm">Удалить</button>
                </div>
            { /each }
        { /if }
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>