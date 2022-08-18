<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/dormitory')
        const dormitories = (await res.json()).dormitories

        if (res.ok) {
            return { props: { dormitories } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm, Graduate } from '$components'
    import { slide } from 'svelte/transition'
    import { Grid } from '$components'
    import type { DormitoryI } from '../../../types'

    export let dormitories: DormitoryI[]

    let success = false
    let errorText = ''
    let successText = ''

    const handleSuccess = (event: CustomEvent<{ message: string }>) => {
        success = true
        successText = event.detail.message
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        success = false
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Общежития</h2>
        <h3>Создать новое общежитие</h3>
        <AjaxForm action="/api/admin/dormitory" method="POST" on:success={ handleSuccess } on:error={ handleError }>
            { #if success }
                <p transition:slide={{ duration: 200 }} class="success">{ successText }</p>
            { /if }
            { #if errorText }
                <p transition:slide={{ duration: 200 }} class="error">{ errorText }</p>
            { /if }
            <Grid m={2} s={1} alignItems="stretch">
                <div>
                    <label>
                        <span class="caption">Название:</span><br />
                        <input class="form-control" type="text" name="title" id="title" required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Адрес:</span><br />
                        <input class="form-control" type="text" name="address" id="address" />
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <input class="form-control" type="text" name="img" id="img" /> <!-- TODO: file upload -->
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </AjaxForm>
    </div>
    { #if dormitories.length }
        <br />
        <div class="white-block-wide">
            <h3 class="no-top-margin">Существующие общежития</h3>
            <Grid m={4} s={1}>
                { #each dormitories as dormitory, i (i) }
                <div>
                    <Graduate name={ dormitory.title } src={ dormitory.img } caption={ dormitory.address } />
                    <div class="mt-3">
                        <a href="/admin-panel/dormitories/update/{ dormitory.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                        <AjaxForm className="d-inline" action="/api/admin/dormitory/{ dormitory.id }" method="DELETE" on:success={ handleSuccess } on:error={ handleError }>
                            <button class="btn btn-outline-danger btn-sm">Удалить</button>
                        </AjaxForm>
                    </div>
                </div>
                { /each }
            </Grid>
        </div>
    { /if }
</section>
<style>
    label {
        width: 100%;
    }
</style>