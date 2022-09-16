<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'

    export const load: Load = async ({ fetch, params }) => {
        const responsibleId = params.id
        const res = await fetch(apiRoute(`admin/responsible/${responsibleId}`))
        const responsible = (await res.json()).responsible

        if (res.ok) {
            return { props: { responsible } }
        }
    }
</script>

<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Form, Grid, FileSelect} from '$components'
    import type { IResponsible, ModalComponent } from '../../../../../types'

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }

    export let responsible: IResponsible

    let responsibleImageModal: ModalComponent = null
    let responsibleImageId: number = null
    let responsibleImagePath: string = null

    const responsibleImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        responsibleImageId = event.detail.id
        responsibleImagePath = event.detail.path
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ responsibleImageModal } on:save={ responsibleImageSelected } />

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <Form method="PATCH" action="/api/admin/responsible/{responsible.id}" reset={ false } redirect="/admin-panel/contacts">
            <h3>Редактирование ответственного лица института</h3>
            <Grid m={2} s={1}>
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
                        name="phone" 
                        value={responsible.phone}
                    />
                </div>
                <div>
                    <label for="email">Адрес электронной почты</label><br />
                    <input class="form-control wide" type="email" name="email" value={responsible.email} required />
                </div>
                <div>
                    <label for="img">Фотография:</label>
                    <input type="hidden" name="img" value={ responsibleImageId }><br />
                    <button type="button" class="btn btn-outline-success" on:click={ responsibleImageModal.open }> { responsibleImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </div>
            </Grid>
            <br />
            {#if responsibleImagePath}
                <p>Предпросмотр:</p>
                <img width="150px" height="150px" src={responsibleImagePath} class="img-fluid" alt="Фотография ответственного лица"><br />   
            {:else}
                <p>Предпросмотр:</p>
                <img width="150px" height="150px" src={responsible.img} class="img-fluid mb-3" alt="Фотография ответственного лица"><br />
            {/if}
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>
        </Form>
    </div>
</section>
