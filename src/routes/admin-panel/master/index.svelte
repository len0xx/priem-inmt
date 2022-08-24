<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const resFeedbacks = await fetch('http://localhost:8080/api/admin/feedback/')
        const resProfessions = await fetch('http://localhost:8080/api/admin/profession/')
        const resQuestions = await fetch('http://localhost:8080/api/admin/question/master/find')

        const feedbacks = (await resFeedbacks.json()).feedbacks
        const professions = (await resProfessions.json()).professions
        const questions = (await resQuestions.json()).questions

        if (resFeedbacks.ok && resProfessions.ok && resQuestions.ok) {
            return { props: { feedbacks, professions, questions } }
        }
    }
</script>
<script lang="ts">
    import { Card, Form, Grid, Modal, Profile } from '$components'
    import type { FeedbackI, ProfessionI, QuestionI } from '../../../types'
    import { range, redirect } from '$lib/utilities'
    import { slide, blur } from 'svelte/transition'

    export let feedbacks: FeedbackI[]
    export let professions: ProfessionI[]
    export let questions: QuestionI[]

    const feedbacksMaster = feedbacks.filter(feedback => feedback.level === 'Магистратура')

    let modal: { open: () => void, close: () => void } = null

    let duties = 1
    const addDuty = () => duties++
    const removeDuty = () => duties--

    let questionId: number

    const updateQuestionId = (id: number) => {
        console.log('click')
        questionId = id
        modal.open()
    }

    const removeQuestion = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/question/${questionId}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/master')
        }
    }

    const handleSuccess = () => {
        redirect('/admin-panel/master')
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
        <Form method="POST" action="/api/admin/question/master" reset={ true } on:success={ handleSuccess }>
            <Grid m={1}>
                <label>
                    <span class="question">Вопрос:</span><br />
                    <input required class="form-control wide" type="text" name="question" />
                </label>
                <label>
                    <span class="answer">Ответ:</span><br />
                    <input required class="form-control wide" type="text" name="answer" />
                </label>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <Grid className="mt-5" m={2}>
            {#if questions.length}
                { #each questions as question, i }
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{ question.text }</h4>
                            <a href="/admin-panel/master/question/update/{ question.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateQuestionId(question.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                { /each }
            {:else}
                <p class="mt-3">Здесь ещё нет созданных вопросов</p>
            {/if}
        </Grid>

        <h3>Профессии</h3>
        <Form action="/api/admin/profession" method="POST" reset={ true } on:success={ handleSuccess }>
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Название:</span><br />
                        <input class="form-control" type="text" name="title" id="title" required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <textarea class="form-control no-margin" type="text" name="description" id="description" rows="4" required ></textarea>
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Минимальная заработная плата:</span><br />
                        <input class="form-control" type="number" name="minsalary" id="minsalary" required />
                    </label>
                </div>
                <div>
                    <span class="caption">Функции специалиста:</span>
                    <br />
                    { #each range(1, duties) as i }
                        <div class="input-group" transition:slide|local={{ duration: 200 }}>
                            <span class="input-group-text">Функция</span>
                            <input type="text" name="duty{i}" class="form-control">
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
            <button class="btn btn-primary">Создать</button>
        </Form>
        { #if professions.length }
            <Grid className="mt-5" m={3} s={1}>
                { #each professions as profession, i (i) }
                    <div>
                        <a href="/admin-panel/master/profession/update/{ profession.id }">
                            <Card variant="white">
                                <span slot="title">{ profession.title }</span>
                            </Card>
                        </a>
                    </div>
                { /each }
            </Grid>
        { :else }
            <p class="mt-3">Здесь еще нет профессий</p>
        { /if }

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
                    <input type="hidden" name="level" value="Магистратура">
                    <label>
                        <span class="caption">Текст отзыва:</span><br />
                        <textarea class="form-control" name="text" id="text" rows="4" required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        { #if feedbacksMaster.length }
            <Grid className="mt-5" m={3} s={1} alignItems="start">
                <Grid m={1} alignItems="start">
                    { #each feedbacksMaster.filter((_, i) => i % 3 == 0) as feedback }
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
                    { #each feedbacksMaster.filter((_, i) => i % 3 == 1) as feedback }
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
                    { #each feedbacksMaster.filter((_, i) => i % 3 == 2) as feedback }
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