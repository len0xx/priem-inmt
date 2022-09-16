<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch, params }) => {
        const featureId = params.id
        const res = await fetch(apiRoute(`admin/feature/${featureId}`))
        const feature = (await res.json()).feature

        if (res.ok) {
            return { props: { feature } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Form } from '$components'
    import type { IFeature } from '../../../../../types'

    export let feature: IFeature
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Редактирование перечисления</h3>
        <Form method="PATCH" action="/api/admin/feature/{ feature.id }" redirect="/admin-panel/main" >
            <Grid m={2} s={1}>
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
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>            
        </Form>
    </div>
</section>