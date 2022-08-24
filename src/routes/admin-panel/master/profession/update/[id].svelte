<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(`http://localhost:8080/api/admin/profession/${id}`)
        const profession = (await res.json()).profession

        if (res.ok) {
            return { props: { profession } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm, Grid, Modal } from '$components'
    import { range, redirect } from '$lib/utilities'
    import { slide, blur } from 'svelte/transition'
    import type { ProfessionI, ModalComponent } from '../../../../../types'

    export let profession: ProfessionI

    let modal: ModalComponent = null
    let updateError = false
    let deleteError = false
    let errorText = ''
    let duties = profession.duties.length

    const addDuty = () => duties++
    const removeDuty = () => duties--

    const handleSuccess = () => {
        redirect('/admin-panel/master')
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        updateError = true
        errorText = event.detail.error
    }

    const removeProfession = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/profession/${profession.id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/master/')
        } else {
            deleteError = true
        }
        modal.close()
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить эту профессию?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeProfession} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Профессии</h2>
        <h3>Редактировать профессию</h3>
        <AjaxForm action="/api/admin/profession/{ profession.id }" method="PATCH" on:success={ handleSuccess } on:error={ handleError } noReset={true}>
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
                        <input class="form-control" type="text" name="title" id="title" value={ profession.title } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" value={ profession.description } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Минимальная заработная плата:</span><br />
                        <input class="form-control" type="text" name="minsalary" id="minsalary" value={ profession.minsalary } required />
                    </label>
                </div>
                <div>
                    <span class="caption">Функции специалиста:</span>
                    <br />
                    { #each range(1, duties) as i }
                        <div class="input-group" transition:slide|local={{ duration: 200 }}>
                            <span class="input-group-text">Функция</span>
                            <input type="text" aria-label="" name="duty{i}" class="form-control" value={ profession.duties[i - 1] }>
                        </div>
                        <br />
                    { /each }
                    { #if duties < 10 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-primary btn-sm" on:click={ addDuty }>Добавить функцию</button> 
                    { /if }
                    { #if duties > 1 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-danger btn-sm" on:click={ removeDuty }>Убрать функцию</button>
                    { /if }
                </div>
            </Grid>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline-danger" on:click={ modal.open }>Удалить профессию</button>
            </div>
        </AjaxForm>
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>