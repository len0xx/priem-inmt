<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/question/bachelor/find')
        const questions = (await res.json()).questions

        if (res.ok) {
            return { props: { questions } }
        }
    }
</script>
<script lang="ts">
    import { Grid, Form, Modal } from '$components'
    import { redirect } from '$lib/utilities'
    import type { QuestionI } from '../../../types'

    export let questions: QuestionI[]

    let modal: { open: () => void, close: () => void } = null
    let questionId: number

    const updateQuestionId = (id: number) => {
        questionId = id
        modal.open()
    }

    const removeQuestion = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/question/${questionId}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/bachelor')
        }
        modal.close()
    }

    const handleSuccess = () => {
        redirect('/admin-panel/bachelor')
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление вопроса FAQ</p>
    <div class="buttons-row">
        <button type="button" on:click={removeQuestion} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Справочная информация FAQ</h3>
        <Form method="POST" action="/api/admin/question/bachelor" on:success={ handleSuccess }>
            <Grid m={1}>
                <label>
                    <span class="question">Вопрос:</span><br />
                    <input required class="form-control wide" type="text" name="question" />
                </label>
                <label>
                    <span class="answer">Ответ:</span><br />
                    <textarea required class="form-control wide" type="text" name="answer" />
                </label>
            </Grid>
            <button class="btn btn-primary">Создать</button>
        </Form>
        <br />
        <h3>Опубликованные ответы на вопросы</h3>
        <Grid m={2}>
            {#if questions.length}
                { #each questions as question, i (i) }
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{ question.text }</h4>
                            <a href="/admin-panel/bachelor/question/update/{ question.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateQuestionId(question.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                { /each }
            {:else}
                <p>Здесь ещё нет созданных вопросов</p>
            {/if}
        </Grid>
    </div>
</section>