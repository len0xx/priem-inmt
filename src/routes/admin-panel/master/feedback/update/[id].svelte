<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'

    export const load: Load = async ({ fetch, params }) => {
        const id = params.id
        const res = await fetch(apiRoute(`admin/feedback/${id}`))
        const feedback = (await res.json()).feedback

        if (res.ok) {
            return { props: { feedback } }
        }
    }
</script>

<script lang="ts">
    import { Form, FileSelect } from '$components'
    import { Grid } from '$components'
    import { isMobile } from '$lib/stores'
    import type { FeedbackI, ModalComponent } from '../../../../../types'

    export let feedback: FeedbackI

    let imageModal: ModalComponent = null
    let imageId: number = null
    let imagePath: string = null

    const imageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        imageId = event.detail.id
        imagePath = event.detail.path
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ imageModal } on:save={ imageSelected } />

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Отзывы</h2>
        <h3>Редактировать отзыв</h3>
        <Form action="/api/admin/feedback/{ feedback.id }" method="PATCH" reset={ false } redirect="/admin-panel/master">
            <Grid m={2} s={1}>
                <Grid m={1}>
                    <label>
                        <span class="caption">Автор:</span><br />
                        <input class="form-control" type="text" name="name" id="name" value={ feedback.name } required />
                    </label>
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" value={ feedback.description } />
                    </label>
                    <label>
                        <span class="caption">Добавить новое изображение:</span>
                        {#if imagePath}
                            <br />
                            <img width="150px" height="150px" src={imagePath} class="img-fluid mt-3" alt="Изображение">
                            <br />
                        {:else}
                            <br />
                            <img width="150px" height="150px" src={feedback.img} class="img-fluid mt-3" alt="Изображение">
                            <br />
                        {/if}
                        <input type="hidden" name="img" value={ imageId }><br />
                        {#if $isMobile}
                            <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                        {:else}
                            <button type="button" class="btn btn-outline-success" on:click={ imageModal.open }> { imageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                        {/if}
                    </label>
                </Grid>
                <label>
                    <span class="caption">Текст отзыва:</span><br />
                    <textarea class="form-control" name="text" id="text" rows="4" value={ feedback.text } required></textarea>
                </label>
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>
        </Form>
    </div>
</section>
<style>
    label {
        width: 100%;
    }
</style>