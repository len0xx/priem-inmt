<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const resFeedbacks = await fetch('http://localhost:8080/api/admin/feedback/?page=bachelor')
        const resOpportunities = await fetch('http://localhost:8080/api/admin/opportunity')
        const resQuestions = await fetch('http://localhost:8080/api/admin/question/?page=bachelor')
    
        const feedbacks = (await resFeedbacks.json()).feedbacks
        const opportunities = (await resOpportunities.json()).opportunities
        const questions = (await resQuestions.json()).questions

        if (resFeedbacks.ok && resOpportunities.ok && resQuestions.ok) {
            return { props: { feedbacks, opportunities, questions } }
        }
    }
</script>
<script lang="ts">
    import { Grid, Form, Icon, Modal, Profile, Text } from '$components'
    import { redirect } from '$lib/utilities'
    import type { FeedbackI, OpportunityI, QuestionI, ModalComponent } from '../../../types'

    export let feedbacks: FeedbackI[]
    export let opportunities: OpportunityI[]
    export let questions: QuestionI[]

    let modal: ModalComponent = null
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
        <Form method="POST" action="/api/admin/question/?page=bachelor" redirect="/admin-panel/bachelor">
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
        {#if questions.length}
            <Grid m={3}>
                { #each questions as question, i (i) }
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{ question.text }</h4>
                            <a href="/admin-panel/bachelor/question/update/{ question.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateQuestionId(question.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                { /each }
            </Grid>
        {:else}
            <p>Здесь ещё нет созданных вопросов</p>
        {/if}

        <h3>Отзывы</h3>
        <Form action="/api/admin/feedback/?page=bachelor" method="POST" redirect="/admin-panel/bachelor">
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
                    { #each feedbacks.filter((_, i) => i % 3 == 1) as feedback }
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
                    { #each feedbacks.filter((_, i) => i % 3 == 2) as feedback }
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

        <h3>Студенческие возможности</h3>
        { #if opportunities.length }
            <Grid className="mt-5" m={4} s={1}>
                { #each opportunities as opportunity, i (i) }
                    <div>
                        <a href="/admin-panel/opportunities/update/{ opportunity.id }">
                            <div class="align-center" style:min-width="200px">
                                <Icon name="blue-star" width={40} height={40} alt="star" />
                                <Text className="semi-bold subtitle">{ opportunity.title }</Text>
                                <Text className="semi-bold small" opacity={0.6}>{ opportunity.description }</Text>
                            </div>
                        </a>
                    </div>
                { /each }
            </Grid>
        { :else }
            <p class="mt-3">Здесь еще нет возможностей</p>
        { /if }
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>
