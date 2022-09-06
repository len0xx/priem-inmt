<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch, params }) => {
        const graduateId = params.id
        const res = await fetch(apiRoute(`admin/graduate/${graduateId}`))
        const graduate = (await res.json()).graduate

        if (res.ok) {
            return { props: { graduate } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Form, FileSelect } from '$components'
    import { isMobile } from '$lib/stores'
    import type { GraduateI, ModalComponent } from '../../../../../types'

    export let graduate: GraduateI

    let fileModal: ModalComponent = null
    let fileId: number = null
    let filePath: string = null

    const fileSelected = (event: CustomEvent<{ id: number, path: string }>) => {
        fileId = event.detail.id
        filePath = event.detail.path
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
        <Form method="PATCH" action="/api/admin/graduate/{ graduate.id }" redirect="/admin-panel/main" >
            <Grid m={2}>
                <label>
                    <span class="caption">ФИО</span>
                    <input required class="form-control" type="text" name="name" value={graduate.name}>
                </label>
                <label>
                    <span class="caption">Год выпуска</span>
                    <input required class="form-control" type="number" name="graduateYear" value={graduate.graduateYear}>
                </label>
                <label>
                    <span class="caption">Описание</span>
                    <input required class="form-control" type="text" name="description" value={graduate.description}>
                </label>
                <label>
                    <span class="caption">Фотография:</span>
                    <input type="hidden" name="photo" value={ fileId }><br />
                    {#if $isMobile}
                        <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                    {:else}
                        <button type="button" class="btn btn-outline-success" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    {/if}
                </label>
            </Grid>
            <br />
            {#if filePath}
                <p>Предпросмотр:</p>
                <img width="150px" height="150px" src={filePath} class="img-fluid mb-3" alt="Фотография известного выпускника"><br />
            {:else}
                <p>Предпросмотр:</p>
                <img width="150px" height="150px" src={graduate.photo} class="img-fluid mb-3" alt="Фотография известного выпускника"><br />
            {/if}
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>            
        </Form>
    </div>
</section>