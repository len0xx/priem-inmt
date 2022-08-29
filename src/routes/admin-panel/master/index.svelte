<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const resFeedbacks = await fetch(apiRoute('admin/feedback/?page=master'))
        const resProfessions = await fetch(apiRoute('admin/profession/'))
        const resQuestions = await fetch(apiRoute('admin/question/?page=master'))
        const resFeatures = await fetch(apiRoute('admin/feature/?type=master'))

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
    import { Form, Grid, Modal, Benefit, RoundButton, Profile, FileSelect, TipTap } from '$components'
    import { range } from '$lib/utilities'
    import { slide, blur } from 'svelte/transition'
    import type { FeatureI, FeedbackI, ProfessionI, QuestionI, ModalComponent } from '../../../types'

    export let feedbacks: FeedbackI[] = []
    export let professions: ProfessionI[] = []
    export let questions: QuestionI[] = []
    export let features: FeatureI[] = []

    let featuresExpanded = false
    let questionsExpanded = false
    let professionsExpanded = false
    let feedbacksExpanded = false

    let questionModal: ModalComponent = null
    let professionModal: ModalComponent = null

    let modalFeature: ModalComponent = null
    let featureId:number

    let modalFeedback: ModalComponent = null
    let feedbackId:number

    let feedbackImageModal: ModalComponent = null
    let feedbackImageId: number = null
    let feedbackImagePath: string = null

    let duties = 1
    const addDuty = () => duties++
    const removeDuty = () => duties--

    let questionId: number
    let professonId: number

    const updateQuestionId = (id: number) => {
        questionId = id
        questionModal.open()
    }

    const updateProfessionId = (id: number) => {
        professonId = id
        professionModal.open()
    }

    const updateFeatureId = (id: number) => {
        featureId = id
        modalFeature.open()
    }

    const updateFeedbackId = (id: number) => {
        feedbackId = id
        modalFeedback.open()
    }

    const feedbackImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        feedbackImageId = event.detail.id
        feedbackImagePath = event.detail.path
    }

    const removeQuestion = async () => {
        const res = await fetch(apiRoute(`admin/question/${questionId}`), { method: 'DELETE' })
        if (res.ok) {
            questions = questions.filter(question => question.id !== questionId)
        }
        questionModal.close()
    }

    const removeProfession = async () => {
        const res = await fetch(apiRoute(`admin/profession/${professonId}`), { method: 'DELETE' })
        if (res.ok) {
            professions = professions.filter(profession => profession.id !== professonId)
        }
        professionModal.close()
    }

    const deleteFeature = async () => {
        const res = await fetch(apiRoute(`admin/feature/${featureId}`), { method: 'DELETE' })
        if (res.ok) {
            features = features.filter(feature => feature.id !== featureId)
        }
        modalFeature.close()
    }

    const deleteFeedback = async () => {
        const res = await fetch(apiRoute(`admin/feedback/${feedbackId}`), { method: 'DELETE' })
        if (res.ok) {
            feedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId)
        }
        modalFeedback.close()
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ feedbackImageModal } on:save={ feedbackImageSelected } />

<Modal bind:this={ questionModal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот ответ на вопрос?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeQuestion} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={questionModal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ professionModal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить эту профессию?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeProfession} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={questionModal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeature } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это перечисление?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeature} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeature.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeedback } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот отзыв?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeedback} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeedback.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование страницы магистратуры</h2>
        <h3 class="no-top-margin">Перечисления</h3>
        <Form action="/api/admin/feature?type=master" method="POST" redirect="/admin-panel/master">
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
        <h3>Опубликованные перечисления</h3>
        {#if features.length}
            <Grid m={3}>
                {#each features as feature, i (i)}
                    {#if i < 6 || featuresExpanded}
                        <div class="card">
                            <div class="card-body">
                                <Benefit num={feature.title} caption={feature.description} />
                                <br />
                                <a href="/admin-panel/master/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateFeatureId(feature.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </div>
                        </div>
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
        <h3>Опубликованные профессии</h3>
        {#if professions.length}
            <Grid m={3} s={1}>
                {#each professions as profession, i (i)}
                    {#if i < 6 || professionsExpanded}
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{ profession.title }</h4>
                                <p class="card-text">{ profession.description }</p>
                                <a href="/admin-panel/master/profession/update/{ profession.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateProfessionId(profession.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !professionsExpanded && professions.length > 6}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => professionsExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет профессий</p>
        {/if}
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
                        <span class="caption">Добавить новое изображение:</span>
                        {#if feedbackImagePath}
                            <br />
                            <img width="150px" height="150px" src={feedbackImagePath} class="img-fluid mt-3" alt="Изображение">
                            <br />
                        {/if}
                        <input type="hidden" name="img" value={ feedbackImageId }><br />
                        <button type="button" class="btn btn-outline-success" on:click={ feedbackImageModal.open }> { feedbackImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
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
        <h3>Опубликованные отзывы</h3>
        {#if feedbacks.length}
            <Grid m={3} s={1} alignItems="start">
                {#each feedbacks as feedback, i (i)}
                    {#if i < 6 || feedbacksExpanded}
                        <Profile variant="white" img={ feedback.img }>
                            <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                            <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                            <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            <svelte:fragment slot="buttons">
                                <a href="/admin-panel/master/feedback/update/{ feedback.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateFeedbackId(feedback.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </svelte:fragment>
                        </Profile>
                    {/if}
                {/each}
            </Grid>
            {#if !feedbacksExpanded && feedbacks.length > 6}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => feedbacksExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет отзывов</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Ответы на вопросы</h3>
        <Form method="POST" action="/api/admin/question/?page=master" reset={ true } redirect="/admin-panel/master">
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
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные ответы на вопросы</h3>
        {#if questions.length}
            <Grid m={3}>
                {#each questions as question, i (i)}
                    {#if i < 6 || questionsExpanded}
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{ question.text }</h4><br />
                                <a href="/admin-panel/master/question/update/{ question.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateQuestionId(question.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !questionsExpanded && questions.length > 6}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => questionsExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет созданных вопросов</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Информационный блок</h3>
        <Form method="POST" action="/api/admin/textinfo/?page=master" reset={ true } redirect="/admin-panel/master">
            <Grid m={2}>
                <div>
                    <span>Навыки выпускников</span>
                    <TipTap name="graduatesSkills" />
                </div>
                <div>
                    <span>Возможности студентов</span>
                    <TipTap name="studentOpportunities" />
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <!-- <Form method="POST" action="/api/admin/feature/?page=master" reset={ true } redirect="/admin-panel/master">
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
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form> -->
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>