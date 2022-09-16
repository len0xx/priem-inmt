<script context="module" lang="ts">
    import { apiRoute } from '$lib/utilities'
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const res = await fetch(apiRoute('admin/programs'))
        const programsResult = (await res.json()).programs

        if (res.ok) {
            return { props: { programs: programsResult } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Modal, ProgramCardNew } from '$components'
    import type { EducationalProgram, ModalComponent } from '../../../types'
    import { redirect } from '$lib/utilities'

    export let programs: EducationalProgram[]

    const programsBach = programs.filter(program => program.degree == 'Бакалавриат')
    const programsSpec = programs.filter(program => program.degree == 'Специалитет')
    const programsMast = programs.filter(program => program.degree == 'Магистратура')
    let modal: ModalComponent = null

    const importPrograms = async () => {
        const res = await fetch(apiRoute('admin/programs/script'), { method: 'POST' })
        if (res.ok) {
            redirect('/admin-panel/programs')
        }

        modal.close()
    }
</script>

<svelte:head>
    <title>Образовательные программы</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">
        Вы уверены, что хотите произвести импорт программ из файла? <br />
        После этого действия будет создано более 40 образовательных программ, состояние которых было актуально в мае 2022. <br />
        Удалить их можно будет только вручную
    </p>
    <div class="buttons-row">
        <button type="button" on:click={ importPrograms } class="btn btn-success">Произвести импорт</button>
        <button type="button" on:click={ modal.close } class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Образовательные программы</h2>
        <a href="/admin-panel/programs/new" class="btn btn-outline-primary">Создать новую программу</a>
        <button type="button" class="btn btn-outline-success" on:click={ modal.open }>Импортировать образовательные программы из файла</button>
        <h3>Бакалавриат{ programsBach.length ? ` (${programsBach.length})` : '' }</h3>
        { #if programsBach.length }
            <Grid s={1} m={2} l={3}>
                { #each programsBach as program }
                    <Grid m={1} className="k2if" gap={0.5}>
                        <ProgramCardNew { program } />
                        <a href="/admin-panel/programs/update/{ program.id }" class="btn btn-outline-primary btn-sm uvnq">Редактировать</a>
                    </Grid>
                { /each }
            </Grid>
        { :else }
        <p>Здесь ещё нет образовательных программ</p>
        { /if }
        <h3>Специалитет { programsSpec.length ? `(${programsSpec.length})` : '' }</h3>
        { #if programsSpec.length }
            <Grid s={1} m={2} l={3}>
                { #each programsSpec as program }
                    <Grid m={1} className="k2if" gap={0.5}>
                        <ProgramCardNew { program } />
                        <a href="/admin-panel/programs/update/{ program.id }" class="btn btn-outline-primary btn-sm uvnq">Редактировать</a>
                    </Grid>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
        <h3>Магистратура{ programsMast.length ? ` (${programsMast.length})` : '' }</h3>
        { #if programsMast.length }
            <Grid s={1} m={2} l={3}>
                { #each programsMast as program }
                    <Grid m={1} className="k2if" gap={0.5}>
                        <ProgramCardNew { program } />
                        <a href="/admin-panel/programs/update/{ program.id }" class="btn btn-outline-primary btn-sm uvnq">Редактировать</a>
                    </Grid>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
    </div>
</section>

<style>
    :global(.k2if) {
        grid-template-rows: auto min-content;
    }

    .uvnq {
        margin-bottom: 0.5em;
    }
</style>