<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/responsible')
        const responsibles = (await res.json()).responsibles

        if (res.ok) {
            return { props: { responsibles } }
        }
    }
</script>
<script lang="ts">
    import { Grid, Card} from '$components'
    import type { ResponsibleI } from '../../../types'

    export let responsibles: ResponsibleI[]

</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <a href="/admin-panel/responsibles/new"><button type="button" class="btn btn-outline-primary">Создать новое ответственное лицо</button></a>
        <h3>Ответственные лица института { responsibles.length ? `(${responsibles.length})` : '' }</h3>
        { #if responsibles.length }
            <Grid s={1} m={2} l={3}>
                { #each responsibles as responsible }
                    <a href="/admin-panel/responsibles/update/{ responsible.id }">
                        <Card variant="white" color="custom">
                            <svelte:fragment slot="title">{ responsible.name }</svelte:fragment>
                            <svelte:fragment slot="left">{ responsible.label ? responsible.label : '' }</svelte:fragment>
                        </Card>
                    </a>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет ответственных лиц</p>
        { /if }
    </div>
</section>
