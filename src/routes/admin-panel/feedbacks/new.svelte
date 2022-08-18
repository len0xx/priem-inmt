<script lang="ts">
    import { AjaxForm, Grid } from '$components'
    import { redirect } from '$lib/utilities'

    let createError = false
    let errorText = ''

    const handleSuccess = () => {
        redirect('/admin-panel/feedbacks')
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        createError = true
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Отзывы</h2>
        <h3>Создать новый отзыв</h3>
        <AjaxForm action="/api/admin/feedback" method="POST" on:success={ handleSuccess } on:error={ handleError }>
            { #if createError }
                <div class="alert alert-danger">
                    Произошла ошибка при&nbsp;создании отзыва
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
                        <textarea class="form-control" name="text" id="text" rows="8" required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </AjaxForm>
    </section>

    <style>
        label {
            width: 100%;
        }
    </style>