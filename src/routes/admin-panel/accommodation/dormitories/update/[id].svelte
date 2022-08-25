<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(apiRoute(`admin/dormitory/${id}`))
        const dormitory = (await res.json()).dormitory

        if (res.ok) {
            return { props: { dormitory } }
        }
    }
</script>

<script lang="ts">
    import { Form, Modal, FileSelect } from '$components'
    import { Grid } from '$components'
    import { redirect } from '$lib/utilities'
    import type { DormitoryI, ModalComponent } from '../../../../../types'

    export let dormitory: DormitoryI

    let modal: ModalComponent = null
    let fileModal: ModalComponent = null
    let fileId: number = null
    let filePath: string = null

    const removeDormitory = async () => {
        const res = await fetch(apiRoute(`admin/dormitory/${dormitory.id}`), { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/dormitories')
        }
        modal.close()
    }

    const fileSelected = (event: CustomEvent<{ id: number, path: string }>) => {
        fileId = event.detail.id
        filePath = event.detail.path
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это общежитие?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeDormitory} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Общежития</h2>
        <h3>Редактировать общежитие</h3>
        <Form action="/api/admin/dormitory/{ dormitory.id }" method="PATCH" reset={false} redirect="/admin-panel/dormitories">
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Название:</span><br />
                        <input class="form-control" type="text" name="title" id="title" value={ dormitory.title } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Адрес:</span><br />
                        <input class="form-control" type="text" name="address" id="address" value={ dormitory.address } required />
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Изображение:</span><br />
                        <img width="150px" height="150px" src={filePath ? filePath : dormitory.img} class="img-fluid mt-3 mb-3" alt="Изображение общежития">                   
                        <input type="hidden" name="img" value={ fileId }><br />
                        <button type="button" class="btn btn-outline-primary" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать другой файл' } </button>
                    </label>
                </div>
            </Grid>
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline-danger" on:click={ modal.open }>Удалить общежитие</button>
                <a href="/admin-panel/accommodation" class="btn btn-outline-secondary">Вернуться назад</a>
            </div>
        </Form>
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>