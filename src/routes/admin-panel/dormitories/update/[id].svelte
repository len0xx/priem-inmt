<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(`http://localhost:8080/api/admin/dormitory/${id}`)
        const dormitory = (await res.json()).dormitory

        if (res.ok) {
            return { props: { dormitory } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm, Modal } from '$components'
    import { Grid } from '$components'
    import { modal } from '$lib/stores'
    import type { DormitoryI } from '../../../../types'
    import { redirect } from '$lib/utilities'

    export let dormitory: DormitoryI

    let updateError = false
    let deleteError = false
    let errorText = ''

    const handleSuccess = () => {
        redirect('/admin-panel/dormitories')
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        updateError = true
        errorText = event.detail.error
    }

    const removeDormitory = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/dormitory/${dormitory.id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/dormitories')
        } else {
            deleteError = true
        }
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ $modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление общежития</p>
    <div class="buttons-row">
        <button type="button" on:click={removeDormitory} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={$modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Общежития</h2>
        <h3>Редактировать общежитие</h3>
        <AjaxForm action="/api/admin/dormitory/{ dormitory.id }" method="PATCH" on:success={ handleSuccess } on:error={ handleError } noReset={true}>
            { #if updateError }
                <div class="alert alert-danger">
                    Произошла ошибка во&nbsp;время обновления
                </div>
            { /if }
            { #if deleteError }
                <div class="alert alert-danger">
                    Произошла ошибка во&nbsp;время удаления
                </div>
            { /if }
            { #if errorText }
                <div class="alert alert-danger">
                    { errorText }
                </div>
            { /if }
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Название:</span><br />
                        <input class="form-control" type="text" name="title" id="title" value={ dormitory.title } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Адрес:</span><br />
                        <input class="form-control" type="text" name="address" id="address" value={ dormitory.address } required />
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <input class="form-control" type="text" name="img" id="img" value={ dormitory.img } /> <!-- TODO: file upload -->
                    </label>
                </div>
            </Grid>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline-danger" on:click={ $modal.open }>Удалить общежитие</button>
            </div>
        </AjaxForm>
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>