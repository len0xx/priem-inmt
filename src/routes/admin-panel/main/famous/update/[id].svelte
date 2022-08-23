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
    import { Grid, Form, FileSelect } from '$components'
    import type { FamousI } from '../../../../../types'

    export let famous: FamousI

    let fileModal: { open: () => void, close: () => void } = null
    let fileId: number = null

    const fileSelected = (event: CustomEvent<number>) => {
        fileId = event.detail
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

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
            <button class="btn btn-primary">Сохранить</button>
        </Form>
    </div>
</section>