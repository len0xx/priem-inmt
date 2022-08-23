<script lang="ts">
    import { AjaxForm, Grid, FileSelect } from '$components'
    import { redirect } from '$lib/utilities'

    let createError = false
    let errorText = ''
    let fileId: number = null
    let fileModal: { open: () => void, close: () => void } = null

    const handleSuccess = () => {
        redirect('/admin-panel/dormitories')
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        createError = true
        errorText = event.detail.error
    }

    const fileSelected = (event: CustomEvent<{id: number}>) => {
        fileId = event.detail.id
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

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
                <label>
                    <span class="caption">Название:</span><br />
                    <input class="form-control" type="text" name="title" id="title" required />
                </label>
                <label>
                    <span class="caption">Адрес:</span><br />
                    <input class="form-control" type="text" name="address" id="address" />
                </label>
                <label>
                    <span class="caption">Изображение { fileId ? `(${ fileId })` : '' }:</span><br />
                    <input type="hidden" name="img" value={ fileId }>
                    <button type="button" class="btn btn-outline-primary" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </label>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </AjaxForm>
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>