<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const resFamous = await fetch('http://localhost:8080/api/admin/famous')
        const famousStudents = (await resFamous.json()).famousStudents

        const resPartners = await fetch('http://localhost:8080/api/admin/partner')
        const partners = (await resPartners.json()).partners

        const resCarousel = await fetch('http://localhost:8080/api/admin/carousel')
        const carouselImages = (await resCarousel.json()).images

        if (resFamous.ok && resPartners.ok && resCarousel.ok) {
            return { props: { famousStudents, partners, carouselImages } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Graduate, Modal, Form, RoundButton, FileSelect } from '$components'
    import type { FamousI, PartnerI, CarouselI, ModalComponent } from '../../../types'

    export let famousStudents: FamousI[] = []
    export let partners: PartnerI[] = []
    export let carouselImages: CarouselI[] = []

    let famousImageModal: ModalComponent = null
    let famousImageId: number = null
    let famousImagePath: string = null

    let partnersImageModal: ModalComponent = null
    let partnersImageId: number = null
    let partnersImagePath: string = null

    let carouselImageModal: ModalComponent = null
    let carouselImageId: number = null
    let carouselImagePath: string = null

    let partnerModal: ModalComponent = null
    let partnerId: number = null

    let carouselModal: ModalComponent = null
    let carouselId: number = null

    let famousExpanded = false
    let partnersExpanded = false
    let carouselExpanded = false

    const famousImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        famousImageId = event.detail.id
        famousImagePath = event.detail.path
    }

    const partnersImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        partnersImageId = event.detail.id
        partnersImagePath = event.detail.path
    }

    const carouselImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        carouselImageId = event.detail.id
        carouselImagePath = event.detail.path
    }

    const removePartner = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/partner/${partnerId}`, { method: 'DELETE' })
        if (res.ok) {
            partners = partners.filter(partner => partner.id !== partnerId)
        }
        partnerModal.close()
    }

    const removeCarouselImage = async () => {
        const res = await fetch(`http://localhost:8080/api/admin/carousel/${carouselId}`, { method: 'DELETE' })
        if (res.ok) {
            carouselImages = carouselImages.filter(image => image.id !== carouselId)
        }
        carouselModal.close()
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ famousImageModal } on:save={ famousImageSelected } />

<FileSelect bind:modal={ partnersImageModal } on:save={ partnersImageSelected } />

<FileSelect bind:modal={ carouselImageModal } on:save={ carouselImageSelected } />

<Modal bind:this={ partnerModal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление партнера института</p>
    <div class="buttons-row">
        <button type="button" on:click={removePartner} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={() => partnerModal.close()} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ carouselModal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление изображения в карусели</p>
    <div class="buttons-row">
        <button type="button" on:click={removeCarouselImage} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={() => carouselModal.close()} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Основная информация о сайте</h3>
        <form action="/api/admin/info/main" method="POST">
            <label>
                <span class="caption">Заголовок в промо-блоке:</span><br />
                <input required class="form-control" type="text" name="title" id="title" placeholder="Заголовок" />
            </label>
            <br />
            <br />
            <label>
                <span class="caption">Сопровождающий текст:</span><br />
                <input required class="form-control" type="text" name="caption" id="caption" placeholder="Сопровождающий текст" />
            </label>
            <br />
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </form>
        <br />
        <h3>Информация о поступлении</h3>
        <form action="/api/admin/info/main" method="POST">
            <label>
                <span class="caption">Заголовок:</span><br />
                <input class="form-control" type="text" name="title" id="title" placeholder="Заголовок" />
            </label>
            <br />
            <h4>Сроки подачи документов</h4>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">[Бюджет] Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">[Бюджет] Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">[Бюджет] Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">[Бюджет] Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
            </div>
            <h4>Период сдачи вступительных испытаний</h4>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">[Контракт] Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">[Контракт] Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">[Контракт] Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">[Контракт] Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </form>
        <br />
        <h3>Контактные данные</h3>
        <form action="/api/admin/info/main" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Контактный номер телефона:</span><br />
                    <input class="form-control" type="tel" name="contact-phone" id="contact-phone" />
                </label>
                <label>
                    <span class="caption">Контактный адрес электронной почты:</span><br />
                    <input class="form-control" type="email" name="contact-email" id="contact-email"
                        placeholder="contact@urfu.ru" />
                </label>
                <label>
                    <span class="caption">Дирекция института:</span><br />
                    <input class="form-control" type="text" name="direction" id="direction"
                        placeholder="г. Екатеринбург, ул. Софьи Ковалевской, 5" />
                </label>
                <label>
                    <span class="caption">Приёмная комиссия:</span><br />
                    <input class="form-control" type="text" name="priem" id="priem"
                        placeholder="г. Екатеринбург, ул. Мира, 19" />
                </label>
                <label>
                    <span class="caption">Ссылка ВКонтакте:</span><br />
                    <input class="form-control" type="text" name="vk" id="vk"
                        placeholder="https://vk.com/ural.federal.university" />
                </label>
                <label>
                    <span class="caption">Ссылка Telegram:</span><br />
                    <input class="form-control" type="text" name="telegram" id="telegram"
                        placeholder="https://t.me/urfu" />
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </form>
        <br />
        <h3>Часто задаваемые вопросы</h3>
        <form action="/api/admin/info/main" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Вопрос</span><br />
                    <input required class="form-control" type="text" name="question" id="question">
                </label>
                <label>
                    <span class="caption">Ответ</span><br />
                    <input required class="form-control" type="text" name="answer" id="answer">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            <button class="btn btn-success">Добавить</button>
        </form>
        <br />
        <h3>Документы</h3>
        <form action="/api/admin/info/main" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Документ</span><br />
                    <input required class="form-control" type="file" name="doc" id="doc"
                        accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpg,image/jpeg,image/png">
                </label>
                <label>
                    <span class="caption">Название</span><br />
                    <input required class="form-control" type="text" name="title" id="title">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            <button class="btn btn-success">Добавить</button>
        </form>
        <br />
        <h3>Партнеры</h3>
        <Form action="/api/admin/partner" method="POST" redirect="/admin-panel/main">
            <label>
                <span class="caption">Выберите логотип партнера:</span>
                {#if partnersImagePath}
                    <br />
                    <img width="150px" height="150px" src={partnersImagePath} class="img-fluid mt-3 mb-3" alt="Логотип партнера">
                    <br />
                {/if}
                <input type="hidden" name="logo" value={ partnersImageId }><br />
                <button type="button" class="btn btn-outline-primary" on:click={ partnersImageModal.open }> { partnersImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
            </label>
            <br />
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <br />
        {#if partners.length}
            <Grid m={5}>
                {#each partners as partner, i (i)}
                    {#if i < 10 || partnersExpanded}
                        <div class="card">
                            <img src={partner.logo} class="img-fluid card-img-top" alt="Логотип партнера">
                            <div class="card-body">
                                <button type="button" class="btn btn-outline-danger" on:click={() => {partnerId = partner.id; partnerModal.open()} }>Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !partnersExpanded && partners.length > 10}
            <br />
            <div class="align-center">
                <RoundButton variant="plus" size="M" on:click={() => partnersExpanded = true} />
            </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет партнеров института</p>
        {/if}
        <br />
        <h3>Изображения в&nbsp;карусели</h3>
        <Form action="/api/admin/carousel" method="POST" redirect="/admin-panel/main">
            <label>
                <span class="caption">Выберите изображение:</span>
                {#if carouselImagePath}
                    <br />
                    <img width="150px" height="150px" src={carouselImagePath} class="img-fluid mt-3 mb-3" alt="Изображение в карусели">
                    <br />
                {/if}
                <input type="hidden" name="img" value={ carouselImageId }><br />
                <button type="button" class="btn btn-outline-primary" on:click={ carouselImageModal.open }> { carouselImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
            </label>
            <br />
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <br />
        {#if carouselImages.length}
            <Grid m={3}>
                {#each carouselImages as image, i (i)}
                    {#if i < 6 || carouselExpanded}
                        <div class="card">
                            <img src={image.img} class="img-fluid card-img-top" alt="Изображение в карусели">
                            <div class="card-body">
                                <button type="button" class="btn btn-outline-danger" on:click={() => {carouselId = image.id; carouselModal.open()} }>Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !carouselExpanded && carouselImages.length > 6}
            <br />
            <div class="align-center">
                <RoundButton variant="plus" size="M" on:click={() => carouselExpanded = true} />
            </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет изображений в карусели</p>
        {/if}
        <!-- <form action="/api/admin/info/main" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Изображение</span><br />
                    <input required class="form-control" type="file" name="logo" id="logo"
                        accept="image/jpg,image/jpeg,image/png,image/webp">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            <button class="btn btn-success">Добавить</button>
        </form> -->
        <br />
        <h3>Молодые специалисты</h3>
        <form action="/api/admin/info/main" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Видео</span><br />
                    <input required class="form-control" type="file" name="video" id="video"
                        accept="video/mp4,video/quicktime">
                </label>
                <label>
                    <span class="caption">Имя</span><br />
                    <input required class="form-control" type="text" name="name" id="name">
                </label>
                <label>
                    <span class="caption">Позиция</span><br />
                    <input required class="form-control" type="text" name="position" id="position">
                </label>
                <label>
                    <span class="caption">Подпись</span><br />
                    <input required class="form-control" type="text" name="caption" id="caption">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            <button class="btn btn-success">Добавить</button>
        </form>
        <br />
        <h3>Перечисления</h3>
        <form action="/api/admin/info/main" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Число</span><br />
                    <input required class="form-control" type="number" name="number" id="number">
                </label>
                <label>
                    <span class="caption">Описание</span><br />
                    <input required class="form-control" type="text" name="caption" id="caption">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            <button class="btn btn-success">Добавить</button>
        </form>
        <br />
        <h3>Специальности</h3>
        <form action="/api/admin/info/main" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Название</span><br />
                    <input required class="form-control" type="text" name="title" id="title">
                </label>
                <label>
                    <span class="caption">Описание</span><br />
                    <input required class="form-control" type="text" name="caption" id="caption">
                </label>
                <label>
                    <span class="caption">Функции</span><br />
                    <textarea required class="form-control" name="functions" id="functions"></textarea>
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            <button class="btn btn-success">Добавить</button>
        </form>
        <br />
        <h3>Известные выпускники</h3>
        <Form action="/api/admin/famous" method="POST" redirect="/admin-panel/main">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">ФИО</span><br />
                    <input required class="form-control" type="text" name="name">
                </label>
                <label>
                    <span class="caption">Год выпуска</span><br />
                    <input required class="form-control" type="number" name="graduateYear">
                </label>
                <label>
                    <span class="caption">Описание</span><br />
                    <input required class="form-control" type="text" name="description">
                </label>
                <label>
                    <span class="caption">Фотография:</span>
                    <input type="hidden" name="photo" value={ famousImageId }><br />
                    <button type="button" class="btn btn-outline-primary" on:click={ famousImageModal.open }> { famousImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </label>
            </div>
            <br />
            {#if famousImagePath}
                <p>Предпросмотр:</p>
                <img width="150px" height="150px" src={famousImagePath} class="img-fluid mb-3" alt="Фотография известного выпускника"><br />   
            {/if}
            <button class="btn btn-primary">Создать</button>
        </Form>
        <br />
        {#if famousStudents.length}
            <Grid m={4}>
                {#each famousStudents as student, i (i)}
                    {#if i < 8 || famousExpanded}
                        <a href="/admin-panel/main/famous/update/{ student.id }">
                            <Graduate name={ student.name } src={ student.photo } caption={ student.description } />
                        </a>
                    {/if}
                {/each}
            </Grid>
            {#if !famousExpanded && famousStudents.length > 8}
            <br />
            <div class="align-center">
                <RoundButton variant="plus" size="M" on:click={() => famousExpanded = true} />
            </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет известных выпускников</p>
        {/if}
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>
