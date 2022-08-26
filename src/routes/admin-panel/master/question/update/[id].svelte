<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch, params }) => {
        const questionId = params.id
        const res = await fetch(apiRoute(`admin/question/${questionId}`))
        const question = (await res.json()).question

        if (res.ok) {
            return { props: { question } }
        }
    }
</script>
<script lang="ts">
    import { Grid, AjaxForm } from '$components'
    import { redirect } from '$lib/utilities'
    import type { QuestionI } from '../../../../../types'

    export let question: QuestionI

    const handleSuccess = () => {
        redirect('/admin-panel/master')
    }

    let updateError = false
    let errorText = ''

    const handleError = (event: CustomEvent) => {
        updateError = true
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Редактирование вопроса FAQ</h3>
        <AjaxForm method="PATCH" action="/api/admin/question/{ question.id }" noReset={ false } on:success={ handleSuccess } on:error={ handleError }>
            <Grid m={1}>
                <label>
                    <span class="question">Вопрос:</span><br />
                    <input required class="form-control wide" type="text" name="question" value={question.text} />
                </label>
                <label>
                    <span class="answer">Ответ:</span><br />
                    <textarea required class="form-control wide" type="text" name="answer" value={question.answer} />
                </label>
            </Grid>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>
        </AjaxForm>
        <div class="alerts mt-4">
            {#if updateError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка{errorText ? `: ${errorText}` : ''}
                </div>
            {/if}
        </div>
    </div>
</section>