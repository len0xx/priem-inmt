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
    import { redirect } from '$lib/utilities'
    import type { FamousI, ModalComponent } from '../../../../../types'

    export let famous: FamousI

    let fileModal: ModalComponent = null
    let fileId: number = null
    let filePath: string = null

    let modal: ModalComponent = null

    const fileSelected = (event: CustomEvent<{ id: number, path: string }>) => {
        fileId = event.detail.id
        filePath = event.detail.path
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
            </Grid>
            <br />
            <label>
                <span class="caption">Фотография:</span><br />
                <img width="150px" height="150px" src={filePath ? filePath : famous.photo} class="img-fluid mt-3 mb-3" alt="Фотография известного выпускника">                   
                <input type="hidden" name="photo" value={ fileId }><br />
                <button type="button" class="btn btn-outline-primary" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать другой файл' } </button>
            </label>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline-danger" on:click={ modal.open }>Удалить выпускника</button>
            </div>            
        </Form>
    </div>
</section>