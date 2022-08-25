<script context="module" lang="ts">
    // import { sendNodeAJAX } from '../../../shared/utilities'
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/programs')
        const programsResult = (await res.json()).programs

        if (res.ok) {
            return { props: { programs: programsResult } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Card, Modal } from '$components'
    import type { EducationalProgram, ModalComponent } from '../../../types'
    import { redirect } from '$lib/utilities'

    export let programs: EducationalProgram[]

    const programsSpec = programs.filter(program => program.degree == 'Специалитет')
    const programsBach = programs.filter(program => program.degree == 'Бакалавриат')
    const programsMast = programs.filter(program => program.degree == 'Магистратура')
    let modal: ModalComponent = null

    const importPrograms = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/programs/script`, { method: 'POST' })
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
        После этого действия будет создано более 30 образовательных программ. Удалить их можно будет только вручную
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
        <button type="button" class="btn btn-outline-primary" on:click={ modal.open }>Импортировать образовательные программы из файла</button>
        <h3>Специалитет { programsSpec.length ? `(${programsSpec.length})` : '' }</h3>
        { #if programsSpec.length }
            <Grid s={1} m={2} l={3}>
                { #each programsSpec as program }
                    <a href="/admin-panel/programs/update/{ program.id }">
                        <Card variant="grey" color="custom">
                            <svelte:fragment slot="title">{ program.title }</svelte:fragment>
                            <svelte:fragment slot="left">{ program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.budget : 'NaN' } бюджет { program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.contract : 'NaN' } контракт</svelte:fragment>
                            <svelte:fragment slot="right">от { program.educationModes.fullTime ? program.educationModes.fullTime.price : 'NaN' } ₽</svelte:fragment>
                        </Card>
                    </a>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
        <h3>Бакалавриат{ programsBach.length ? ` (${programsBach.length})` : '' }</h3>
        { #if programsBach.length }
            <Grid s={1} m={2} l={3}>
                { #each programsBach as program }
                    <a href="/admin-panel/programs/update/{ program.id }">
                        <Card variant="grey" color="custom">
                            <svelte:fragment slot="title">{ program.title }</svelte:fragment>
                            <svelte:fragment slot="left">{ program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.budget : 'NaN' } бюджет { program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.contract : 'NaN' } контракт</svelte:fragment>
                            <svelte:fragment slot="right">от { program.educationModes.fullTime ? program.educationModes.fullTime.price : 'NaN' } ₽</svelte:fragment>
                        </Card>
                    </a>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
        <h3>Магистратура{ programsMast.length ? ` (${programsMast.length})` : '' }</h3>
        { #if programsMast.length }
            <Grid s={1} m={2} l={3}>
                { #each programsMast as program }
                    <a href="/admin-panel/programs/update/{ program.id }">
                        <Card variant="grey" color="custom">
                            <svelte:fragment slot="title">{ program.title }</svelte:fragment>
                            <svelte:fragment slot="left">{ program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.budget : 'NaN' } бюджет { program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.contract : 'NaN' } контракт</svelte:fragment>
                            <svelte:fragment slot="right">от { program.educationModes.fullTime ? program.educationModes.fullTime.price : 'NaN' } ₽</svelte:fragment>
                        </Card>
                    </a>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
    </div>
</section>
