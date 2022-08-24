<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const resFeedbacks = await fetch('http://localhost:8080/api/admin/feedback/')
        const resQuestions = await fetch('http://localhost:8080/api/admin/question/bachelor/find')
    
        const feedbacks = (await resFeedbacks.json()).feedbacks
        const questions = (await resQuestions.json()).questions

        if (resFeedbacks.ok && resQuestions.ok) {
            return { props: { feedbacks, questions } }
        }
    }
</script>
<script lang="ts">
    import { Grid, Form, Modal, Profile } from '$components'
    import { redirect } from '$lib/utilities'
    import type { FeedbackI, QuestionI } from '../../../types'

    export let questions: QuestionI[]
    export let feedbacks: FeedbackI[]

    const feedbacksBachelor = feedbacks.filter(feedback => feedback.level === 'Бакалавриат' || feedback.level === 'Специалитет')

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

        <h3>Отзывы</h3>
        <Form action="/api/admin/feedback" method="POST">
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Автор:</span><br />
                        <input class="form-control" type="text" name="name" id="name" required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <input class="form-control" type="text" name="img" id="img" /> <!-- TODO: file upload -->
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Уровень образования:</span><br />
                        <select class="form-control" name="level" id="level">
                            <option>Бакалавриат</option>
                            <option>Специалитет</option>
                        </select>
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Текст отзыва:</span><br />
                        <textarea class="form-control" name="text" id="text" rows="4" required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        { #if feedbacksBachelor.length }
            <Grid className="mt-5" m={3} s={1} alignItems="start">
                <Grid m={1} alignItems="start">
                    { #each feedbacksBachelor.filter((_, i) => i % 3 == 0) as feedback }
                        <a href="/admin-panel/bachelor/feedback/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
                <Grid m={1} alignItems="start">
                    { #each feedbacksBachelor.filter((_, i) => i % 3 == 1) as feedback }
                        <a href="/admin-panel/bachelor/feedback/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
                <Grid m={1} alignItems="start">
                    { #each feedbacksBachelor.filter((_, i) => i % 3 == 2) as feedback }
                        <a href="/admin-panel/bachelor/feedback/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
            </Grid>
        { :else }
            <p class="mt-3">Здесь еще нет отзывов</p>
        { /if }
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>