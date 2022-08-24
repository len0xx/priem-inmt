<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch, params }) => {
        const featureId = params.id
        const res = await fetch(`http://localhost:8080/api/admin/feature/${featureId}`)
        const feature = (await res.json()).feature

        if (res.ok) {
            return { props: { feature } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Form, Modal } from '$components'
    import { redirect } from '$lib/utilities'
    import type { FeatureI, ModalComponent } from '../../../../../types'

    export let feature: FeatureI

    let modal: ModalComponent = null

    const removeFeature = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/feature/${feature.id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/main')
        }
        modal.close()
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это перечисление?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeFeature} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Редактирование перечисления</h3>
        <Form method="PATCH" action="/api/admin/feature/{ feature.id }" redirect="/admin-panel/main" >
            <Grid m={2}>
                <label>
                    <span class="caption">Название:</span>
                    <input required class="form-control" type="text" name="title" value={feature.title}>
                </label>
                <label>
                    <span class="caption">Подпись:</span>
                    <input required class="form-control" type="text" name="description" value={feature.description}>
                </label>
            </Grid>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline-danger" on:click={ modal.open }>Удалить перечисление</button>
            </div>            
        </Form>
    </div>
</section>