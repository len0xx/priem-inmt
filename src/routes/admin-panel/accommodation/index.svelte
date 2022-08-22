<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/documents')
        const documents = (await res.json()).documents

        const settlementRes = await fetch('http://localhost:8080/api/admin/settlement/1')
        const settlement = (await settlementRes.json()).responsible

        if (res.ok && settlementRes.ok) {
            return { props: { documents, settlement } }
        }
    }
</script>

<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Grid, Form, Modal, Document } from '$components'
    import type { DocumentI, SettlementI } from '../../../types'

    export let documents: DocumentI[] = []
    export let settlement: SettlementI = null

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }

    let deleteId = 0
    let modal: { open: () => void, close: () => void } = null

    const deleteDocument = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/documents/${deleteId}`, { method: 'DELETE' })
        if (res.ok) {
            documents = documents.filter(doc => doc.id !== deleteId)
        }
        modal.close()
    }

    const handleSuccess = (event: CustomEvent<{ message: string, document: DocumentI }>) => {
        const doc = event.detail.document
        documents = [ ...documents, doc ]
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление документа</p>
    <div class="buttons-row">
        <button type="button" on:click={ deleteDocument } class="btn btn-danger">Удалить</button>
        <button type="button" on:click={ modal.close } class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Поселение</h2>
        <h3>Загрузка документов</h3>
        <Form action="/api/admin/documents" method="POST" content="multipart/form-data" on:success={ handleSuccess }>
            <label class="wide">
                <span class="form-label">Название документа</span>
                <input type="text" class="form-control wide" placeholder="Название" name="title" required />
            </label>
            <br />
            <br />
            <Grid m={3}>
                <label>
                    <span class="caption">Документ</span><br />
                    <input required class="form-control" type="file" name="file" id="file" />
                </label>
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary">Отправить</button>
            </div>
        </Form>
        { #if documents.length }
            <h3>Загруженные документы</h3>
            { #each documents as document, i (i) }
                { @const parts = document.src.split('.') }
                { @const extensionLength = parts.length }
                { @const extension = extensionLength > 1 ? parts[parts.length - 1] : '' }

                <div class="document-row">
                    <Document filename={ document.title } { extension } link={ document.src } />
                    <button type="button" on:click={() => { deleteId = document.id; modal.open() } } class="btn btn-outline-danger btn-sm">Удалить</button>
                </div>
            { /each }
        { /if }
        <br />
        <h3>Ответственный за поселение</h3>
        <Form 
            action={settlement ? `/api/admin/settlement/${settlement.id}` : '/api/admin/settlement'} 
            method={settlement ? 'PATCH' : 'POST'} 
            reset={false}
            on:success={ handleSuccess }
        >
            <Grid m={2}>
                <div>
                    <label for="name">ФИО</label>
                    <input type="text" class="form-control wide" name="name" value={settlement.name} required />
                </div>
                <div>
                    <label for="label">Подпись</label>
                    <input type="text" class="form-control wide" name="label" value={settlement.label} required />
                </div>
            </Grid>
            <br />
            <Grid m={2}>
                <div>
                    <label for="address">Адрес</label>
                    <input required class="form-control" type="text" value={settlement.address} name="address" />
                </div>
                <div>
                    <label for="auditory">Аудитория</label>
                    <input required class="form-control" type="text" value={settlement.auditory} name="auditory" />
                </div>
            </Grid>
            <br />
            <Grid m={2}>
                <div>
                    <label for="phone">Номер телефона</label>
                    <input required class="form-control" type="text" value={settlement.phone} use:imask={ phoneMask } name="phone" />
                </div>
                <div>
                    <label for="email">Адрес электронной почты</label>
                    <input required class="form-control" type="email" value={settlement.email} name="email" />
                </div>
            </Grid>
            <div class="buttons-row">
                {#if settlement}
                    <button class="btn btn-primary">Сохранить</button>
                {:else}
                    <button class="btn btn-primary">Создать</button>
                {/if}
            </div>
        </Form>
    </div>
</section>
