<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        const responsibleId = params.id
        const res = await fetch(`http://localhost:8080/api/admin/responsible/${responsibleId}`)
        const responsible = (await res.json()).responsible

        if (res.ok) {
            return { props: { responsible } }
        }
    }
</script>

<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Grid, AjaxForm, Modal} from '$components'
    import { redirect } from '$lib/utilities'
    import type { ResponsibleI, ModalComponent } from '../../../../types'

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }

    export let responsible: ResponsibleI

    let updateError = false
    let deleteError = false
    let modal: ModalComponent = null

    const removeResponsible = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/responsible/${responsible.id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/responsibles')
        } else {
            deleteError = true
        }
        modal.close()
    }

    const handleSuccess = () => {
        redirect('/admin-panel/responsibles')
    }

    let errorText = ''

    const handleError = (event: CustomEvent) => {
        updateError = true
        errorText = event.detail.error
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление ответственного лица</p>
    <div class="buttons-row">
        <button type="button" on:click={removeResponsible} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <AjaxForm method="PATCH" action="/api/admin/responsible/{responsible.id}" noReset={ false } on:success={ handleSuccess } on:error={ handleError }>
            <h3>Редактирование ответственного лица института</h3>
            <Grid m={2}>
                <div>
                    <label for="name">ФИО ответственного лица</label><br />
                    <input class="form-control wide" type="text" name="name" value={responsible.name} required />
                </div>
                <div>
                    <label for="label">Подпись</label><br />
                    <input class="form-control wide" type="text" name="label" value={responsible.label} required />
                </div>
                <div>
                    <label for="phone">Номер телефона</label><br />
                    <input
                        class="form-control wide"
                        type="text" 
                        use:imask={ phoneMask }
                        name="phone" required 
                        value={responsible.phone}
                    />
                </div>
                <div>
                    <label for="email">Адрес электронной почты</label><br />
                    <input class="form-control wide" type="email" name="email" value={responsible.email} required />
                </div>
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click={modal.open} class="btn btn-danger">Удалить</button>
            </div>
        </AjaxForm>
        <div class="alerts mt-4">
            {#if updateError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка{errorText ? `: ${errorText}` : ''}
                </div>
            {/if}
            {#if deleteError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка во время удаления
                </div>
            {/if}
        </div>
    </div>
</section>
