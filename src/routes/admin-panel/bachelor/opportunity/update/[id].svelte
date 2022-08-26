<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(apiRoute(`admin/opportunity/${id}`))
        const opportunity = (await res.json()).opportunity

        if (res.ok) {
            return { props: { opportunity } }
        }
    }
</script>

<script lang="ts">
    import { Form } from '$components'
    import type { OpportunityI } from '../../../../../types'

    export let opportunity: OpportunityI
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Студенческие возможности</h2>
        <h3>Редактировать возможность</h3>
        <Form action="/api/admin/opportunity/{ opportunity.id }" method="PATCH" reset={ false } redirect="/admin-panel/bachelor">
            <label>
                <span class="caption">Название:</span><br />
                <input class="form-control" type="text" name="title" id="title" value={ opportunity.title } required />
            </label>
            <br />
            <br />
            <label>
                <span class="caption">Описание:</span><br />
                <input class="form-control" type="text" name="description" id="description" value={ opportunity.description } required />
            </label>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>
        </Form>
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>