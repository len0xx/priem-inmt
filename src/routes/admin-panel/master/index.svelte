<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const resQuestions = await fetch('http://localhost:8080/api/admin/question/master/find')
        const resProfessions = await fetch('http://localhost:8080/api/admin/profession/')

        const questions = (await resQuestions.json()).questions
        const professions = (await resProfessions.json()).professions

        if (resQuestions.ok && resProfessions.ok) {
            return { props: { questions, professions } }
        }
    }
</script>
<script lang="ts">
    import { Card, Grid, AjaxForm, Modal } from '$components'
    import type { ProfessionI, QuestionI } from '../../../types'
    import { range, redirect } from '$lib/utilities'
    import { slide, blur } from 'svelte/transition'

    export let professions: ProfessionI[]
    export let questions: QuestionI[]

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

    let createError = false
    let errorText = ''

    const handleError = (event: CustomEvent) => {
        createError = true
        errorText = event.detail.error
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
        <AjaxForm method="POST" action="/api/admin/question/master" noReset={ false } on:success={ handleSuccess } on:error={ handleError }>
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
            <br />
            <button class="btn btn-primary">Создать</button>
        </AjaxForm>
        <div class="alerts mt-4">
            {#if createError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка{errorText ? `: ${errorText}` : ''}
                </div>
            {/if}
        </div>
        <Grid m={2}>
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
                <p>Здесь ещё нет созданных вопросов</p>
            {/if}
        </Grid>

        <h3>Профессии</h3>
        <AjaxForm action="/api/admin/profession" method="POST" on:success={ handleSuccess } on:error={ handleError }>
            { #if createError }
                <div class="alert alert-danger">
                    Произошла ошибка при&nbsp;создании профессии
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
                        <input class="form-control" type="text" name="title" id="title" required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" required />
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
        </AjaxForm>
        { #if professions.length }
            <Grid className="mt-5" m={3} s={1}>
                { #each professions as profession, i (i) }
                    <div>
                        <a href="/admin-panel/master/profession/update/{ profession.id }">
                            <Card>
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
</section>

<style>
    label {
        width: 100%;
    }
</style>