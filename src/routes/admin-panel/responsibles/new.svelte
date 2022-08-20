<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Grid, AjaxForm} from '$components'
    import { redirect } from '$lib/utilities'

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }

    const handleSuccess = () => {
        redirect('/admin-panel/responsibles')
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
        <AjaxForm method="POST" action="/api/admin/responsible" noReset={ false } on:success={ handleSuccess } on:error={ handleError }>
            <h3>Создать ответственное лицо института</h3>
            <Grid m={2}>
                <div>
                    <label for="name">ФИО ответственного лица</label><br />
                    <input class="form-control wide" type="text" name="name" required />
                </div>
                <div>
                    <label for="label">Подпись</label><br />
                    <input class="form-control wide" type="text" name="label" required />
                </div>
                <div>
                    <label for="phone">Номер телефона</label><br />
                    <input
                        class="form-control wide"
                        type="text" 
                        use:imask={ phoneMask }
                        name="phone" required 
                    />
                </div>
                <div>
                    <label for="email">Адрес электронной почты</label><br />
                    <input class="form-control wide" type="email" name="email" required />
                </div>
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary">Создать</button>
            </div>
        </AjaxForm>
        <div class="alerts mt-4">
            {#if createError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка{errorText ? `: ${errorText}` : ''}
                </div>
            {/if}
        </div>
    </div>
</section>
