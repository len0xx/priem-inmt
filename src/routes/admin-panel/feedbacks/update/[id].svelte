<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(`http://localhost:8080/api/admin/feedback/${id}`)
        const feedback = (await res.json()).feedback

        if (res.ok) {
            return { props: { feedback } }
        }
    }
</script>

<script lang="ts">
    import { AjaxForm, Modal } from '$components'
    import { Grid } from '$components'
    import type { FeedbackI } from '../../../../types'
    import { redirect } from '$lib/utilities'

    export let feedback: FeedbackI

    let modal = null
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

    const removefeedback = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/feedback/${feedback.id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/feedbacks')
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
    <p class="mb-4">Подтвердите удаление отзыва</p>
    <div class="buttons-row">
        <button type="button" on:click={removefeedback} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Отзывы</h2>
        <h3>Редактировать отзыв</h3>
        <AjaxForm action="/api/admin/feedback/{ feedback.id }" method="PATCH" on:success={ handleSuccess } on:error={ handleError } noReset={true}>
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
                        <span class="caption">Автор:</span><br />
                        <input class="form-control" type="text" name="name" id="name" value={ feedback.name } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" value={ feedback.description } />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <input class="form-control" type="text" name="img" id="img" value={ feedback.img } /> <!-- TODO: file upload -->
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Текст отзыва:</span><br />
                        <textarea class="form-control" name="text" id="text" rows="8" value={ feedback.text } required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline-danger" on:click={ modal.open }>Удалить отзыв</button>
            </div>
        </AjaxForm>
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>