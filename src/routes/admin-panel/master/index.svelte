<script lang="ts">
    import { Grid, AjaxForm } from '$components'

    let activeQuestions = [true, false, false, false, false]
    let countQuestions = 1

    const addQuestion = () => {
        let active = 1
        for (let i = 1; i < activeQuestions.length; i++) {
            if (!activeQuestions[i]) {
                activeQuestions[i] = true
                active++
                countQuestions = active
                return
            }   
            active++   
        }
    }

    const removeQuestion = () => {
        let active = 5
        for (let i = activeQuestions.length - 1; i >= 1; i--) {
            if (activeQuestions[i]) {
                activeQuestions[i] = false
                active--
                countQuestions = active
                return
            }   
            active--   
        }
    }

    const handleSuccess = () => {
        console.log("Eah")
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

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Справочная информация FAQ</h3>
        <AjaxForm method="POST" action="/api/admin/programs" noReset={ false } on:success={ handleSuccess } on:error={ handleError }>
            <Grid m={1}>
                { #each activeQuestions as question, i }
                    { #if question }
                        <label>
                            <span class="question{i + 1}">Вопрос:</span><br />
                            <input required class="form-control wide" type="text" name="question{i + 1}" />
                        </label>
                        <label>
                            <span class="answer{i + 1}">Ответ:</span><br />
                            <input required class="form-control wide" type="text" name="answer{i + 1}" />
                        </label>
                    { /if }
                { /each }
            </Grid>
            <div class="buttons-row">
                { #if countQuestions < 5 }
                    <button type="button" on:click={ addQuestion } class="btn btn-outline-primary">Добавить вопрос</button>
                { /if }
                { #if countQuestions > 1 }
                    <button type="button" on:click={ removeQuestion } class="btn btn-outline-danger">Удалить вопрос</button>
                { /if }
            </div>
            <br />
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </AjaxForm>
        <div class="alerts mt-4">
            {#if createError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка
                </div>
            {/if}
            {#if errorText}
                <div class="alert alert-danger" role="alert">
                    {errorText}
                </div>
            {/if}
        </div>
    </div>
</section>