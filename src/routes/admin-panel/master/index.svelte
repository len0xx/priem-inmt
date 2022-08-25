<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const resFeedbacks = await fetch('http://localhost:8080/api/admin/feedback/?page=master')
        const resProfessions = await fetch('http://localhost:8080/api/admin/profession/')
        const resQuestions = await fetch('http://localhost:8080/api/admin/question/?page=master')
        const resFeatures = await fetch('http://localhost:8080/api/admin/feature/?page=master')

        const feedbacks = (await resFeedbacks.json()).feedbacks
        const professions = (await resProfessions.json()).professions
        const questions = (await resQuestions.json()).questions
        const features = (await resFeatures.json()).features

        if (resFeedbacks.ok && resProfessions.ok && resQuestions.ok && resFeatures.ok) {
            return { props: { feedbacks, professions, questions, features } }
        }
    }
</script>
<script lang="ts">
    import { Card, Form, Grid, Modal, Benefit, RoundButton, Profile } from '$components'
    import { range, redirect } from '$lib/utilities'
    import { slide, blur } from 'svelte/transition'
    import type { FeatureI, FeedbackI, ProfessionI, QuestionI, ModalComponent } from '../../../types'

    export let feedbacks: FeedbackI[] = []
    export let professions: ProfessionI[] = []
    export let questions: QuestionI[] = []
    export let features: FeatureI[] = []

    let featuresExpanded = false

    let modal: ModalComponent = null

    let duties = 1
    const addDuty = () => duties++
    const removeDuty = () => duties--

    let questionId: number

    const updateQuestionId = (id: number) => {
        questionId = id
        modal.open()
    }

    const removeQuestion = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/question/${questionId}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/master')
        }
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот вопрос FAQ?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeQuestion} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование страницы магистратуры</h2>
        <h3>Справочная информация FAQ</h3>
        <Form method="POST" action="/api/admin/question/?page=master" reset={ true } redirect="/admin-panel/master">
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
        <br />
        {#if questions.length}
            <Grid m={3}>
                { #each questions as question, i }
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{ question.text }</h4>
                            <a href="/admin-panel/master/question/update/{ question.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateQuestionId(question.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                { /each }
            </Grid>
        {:else}
            <p>Здесь ещё нет созданных вопросов</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Профессии</h3>
        <Form action="/api/admin/profession" method="POST" reset={ true } redirect="/admin-panel/master">
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
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Отзывы</h3>
        <Form action="/api/admin/feedback/?page=master" method="POST" redirect="/admin-panel/master">
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
                        <span class="caption">Текст отзыва:</span><br />
                        <textarea class="form-control" name="text" id="text" rows="4" required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        { #if feedbacks.length }
            <Grid className="mt-5" m={3} s={1} alignItems="start">
                <Grid m={1} alignItems="start">
                    { #each feedbacks.filter((_, i) => i % 3 == 0) as feedback }
                        <a href="/admin-panel/master/feedback/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
                <Grid m={1} alignItems="start">
                    { #each feedbacks.filter((_, i) => i % 3 == 1) as feedback }
                        <a href="/admin-panel/master/feedback/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
                <Grid m={1} alignItems="start">
                    { #each feedbacks.filter((_, i) => i % 3 == 2) as feedback }
                        <a href="/admin-panel/master/feedback/update/{ feedback.id }">
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
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Перечисления</h3>
        <Form action="/api/admin/feature?page=master" method="POST" redirect="/admin-panel/master">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Заголовок:</span><br />
                    <input required class="form-control" type="text" name="title">
                </label>
                <label>
                    <span class="caption">Подпись:</span><br />
                    <input required class="form-control" type="text" name="description">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <br />
        {#if features.length}
            <Grid m={3}>
                {#each features as feature, i (i)}
                    {#if i < 6 || featuresExpanded}
                        <a href="/admin-panel/master/feature/update/{ feature.id }">
                            <Benefit num={feature.title} caption={feature.description} />
                        </a>
                    {/if}
                {/each}
            </Grid>
            {#if !featuresExpanded && features.length > 6}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => featuresExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет перечислений</p>
        {/if}
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>