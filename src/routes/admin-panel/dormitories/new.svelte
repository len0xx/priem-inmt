<script lang="ts">
    import { AjaxForm, Grid } from '$components'
    import { redirect } from '$lib/utilities'

    let createError = false
    let errorText = ''

    const handleSuccess = () => {
        redirect('/admin-panel/dormitories')
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
        <h2 class="no-top-margin">Общежития</h2>
        <h3>Создать новое общежитие</h3>
        <AjaxForm action="/api/admin/dormitory" method="POST" on:success={ handleSuccess } on:error={ handleError }>
            { #if createError }
                <div class="alert alert-danger">
                    Произошла ошибка при&nbsp;создании общежития
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
                        <span class="caption">Адрес:</span><br />
                        <input class="form-control" type="text" name="address" id="address" />
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <input class="form-control" type="text" name="img" id="img" /> <!-- TODO: file upload -->
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