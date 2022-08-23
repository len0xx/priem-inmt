<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch, params }) => {
        const famousId = params.id
        const res = await fetch(`http://localhost:8080/api/admin/famous/${famousId}`)
        const famous = (await res.json()).famous

        if (res.ok) {
            return { props: { famous } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Form, Modal, FileSelect } from '$components'
    import type { FamousI } from '../../../../../types'
    import { redirect } from '$lib/utilities'

    export let famous: FamousI

    let fileModal: { open: () => void, close: () => void } = null
    let fileId: number = null

    let modal: { open: () => void, close: () => void } = null

    const fileSelected = (event: CustomEvent<number>) => {
        fileId = event.detail
    }

    const removeFamous = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/famous/${famous.id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/main')
        }
        modal.close()
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление известного выпускника</p>
    <div class="buttons-row">
        <button type="button" on:click={removeFamous} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Редактирование известного выпускника</h3>
        <Form method="PATCH" action="/api/admin/famous/{ famous.id }" redirect="/admin-panel/main" >
            <Grid m={2}>
                <label>
                    <span class="caption">ФИО</span>
                    <input required class="form-control" type="text" name="name" value={famous.name}>
                </label>
                <label>
                    <span class="caption">Год выпуска</span>
                    <input required class="form-control" type="number" name="graduateYear" value={famous.graduateYear}>
                </label>
                <label>
                    <span class="caption">Описание</span>
                    <input required class="form-control" type="text" name="description" value={famous.description}>
                </label>
                <label>
                    <span class="caption">Изображение { fileId ? `(${ fileId })` : '' }:</span><br />
                    <input type="hidden" name="photo" value={ fileId }>
                    <button type="button" class="btn btn-outline-primary" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </label>
            </Grid>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline-danger" on:click={ modal.open }>Удалить выпускника</button>
            </div>            
        </Form>
    </div>
</section>